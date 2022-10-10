
  const argDefaultColor = "lightgray";
  const argDefaultStroke = "darkslategray";
  const isArgFixedColor = "#6BCEFF";

  const UnselectedBrush = "transparent";  // item appearance, if not "selected"
  const SelectedBrush = "orange";   // item appearance, if "selected"
  
  var argTemplate = $(go.Panel,"Auto", {name: "AMOGUS"}, argStyle());
  var varDeclArgTemplate = $(go.Panel,"Auto", varDeclArgStyle());
  var varArgTemplate = $(go.Panel,"Auto", varArgStyle());

  var argsTemplate = $(go.Node,"Vertical", argsStyle());
  
  var argHoverAdornment =
      $(go.Adornment, "Spot",
      new go.Binding("visible", "", function() {return true}),
      new go.Binding("visible", "connectedBlock", function(v) {return !v}),
      {
        mouseLeave: (e, obj) => {
        var ad = obj.part;
        ad.adornedPart.removeAdornment("mouseEnter");
        }
      },
      $(go.Placeholder,
          {
          //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
          isActionable: true,  // needed because this is in a temporary Layer
          click: (e, obj) => {
              var node = obj.part.adornedPart;
              node.diagram.select(node);
          }
          }),
      $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.BottomLeft },
          new go.Binding("visible", "color", function(v) { return false;}),
          { click: (e, obj) => activatePort(obj.part.adornedObject) },
          $(go.TextBlock, "Add port")),
      $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.TopLeft },
          { click: (e, obj) => {
            activateTextField(obj.part.adornedObject)} 
          },
          $(go.TextBlock, "Add variable/value"))
      );

  var varArgHoverAdornment =
      $(go.Adornment, "Spot",
      new go.Binding("visible", "", function() {return true}),
      new go.Binding("visible", "connectedBlock", function(v) {return !v}),
      {
        mouseLeave: (e, obj) => {
        var ad = obj.part;
        ad.adornedPart.removeAdornment("mouseEnter");
        }
      },
      $(go.Placeholder,
        {
          //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
          isActionable: true,  // needed because this is in a temporary Layer
          click: (e, obj) => {
              var node = obj.part.adornedPart;
              node.diagram.select(node);
          }
      }),
      $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.BottomLeft },
          new go.Binding("visible", "color", function(v) { return false;}),
          { click: (e, obj) => activateExistingVar(obj.part.adornedObject) },
          $(go.TextBlock, "Add existing variable")),
      $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.TopLeft },
          { click: (e, obj) => {
            activateNewVar(obj.part.adornedObject)} 
          },
          $(go.TextBlock, "Add new variable"))
      );

  function isArgSelected(item) {
    return item.stroke !== argDefaultStroke;
  }
      
  function setArgSelected(item, sel) {
    if (sel) {
      item.stroke = SelectedBrush; //override
    } 
    else {
      item.stroke = argDefaultStroke;
    }
  }
  
  function onArgClick(e, item) {
    var oldskips = item.diagram.skipsUndoManager;
    console.log("inside click fun");
    item.diagram.skipsUndoManager = true;
    if (e.control || e.meta) {
      setArgSelected(item, !isArgSelected(item));
      item.part.isSelected = item.panel.elements.any(isArgSelected);
      console.log(item.part.isSelected);
    } 
    else if (e.shift) {
      // alternative policy: select all fields between this item and some other one??
      if (!isArgSelected(item)) setArgSelected(item, true);
      item.part.isSelected = true;
    } 
    else {
      if (!isArgSelected(item)) {
        // deselect all sibling items
        console.log(item.panel);
        item.panel.elements.each(it => {
          setArgSelected(it, false);
        });
        setArgSelected(item, true);
        item.part.isSelected = true;
      }
      else {
        setArgSelected(item, false);
        item.part.isSelected = false;
      }
    }
    
    item.diagram.skipsUndoManager = oldskips;
  }

  function addArg(arg) {
    if (!(arg instanceof go.Node)) return;
    
    let i = 1;
    while (arg.findPort( i.toString() +":") !== arg) 
    {
      i++;
    }
    const name = i.toString()+":";
    const arr = arg.data.items;
    if(arg.data.arity && arg.data.arity.to && arr.length == arg.data.arity.to)
      return;

    myDiagram.startTransaction("add argument"); 
    if (arr) {
      // create a new port data object
      const newportdata = {
        portId: name
      };
      // and add it to the end of Array of port data
      myDiagram.model.insertArrayItem(arr, -1, newportdata);
    }
    myDiagram.commitTransaction("add argument");
  }

  function removeArg(arg) {
    if (!arg) return;
    var arr = arg.data.items;
    if(arg.data.arity && arg.data.arity.from && arr.length == arg.data.arity.from)
      return;
    
    myDiagram.startTransaction("remove argument");
    myDiagram.model.removeArrayItem(arr);
    myDiagram.commitTransaction("remove argument");
  }

  function activatePort(arg) {
    myDiagram.startTransaction("makePort");
    const data = arg.data;
    console.log(data);
    myDiagram.model.setDataProperty(data, "isport", true);
    myDiagram.commitTransaction("makePort");
  }

  function activateTextField(arg) {
    myDiagram.startTransaction("makeTextField");
    const data = arg.data;  
    //console.log(data);
    //console.log(argnode.part.data); //arguments

    links = arg.part.findLinksOutOf();
    while(links.next()) {
      //console.log(links.value.data);
      if(links.value.data.fromPort == arg.data.portId){
        myDiagram.remove(links.value);
      }
    }
    myDiagram.model.setDataProperty(data, "isport", false);
    myDiagram.commitTransaction("makeTextField");
  }

  function activateExistingVar(arg) {
    myDiagram.startTransaction("makeDropdown");
    const data = arg.data;
    console.log(data);
    myDiagram.model.setDataProperty(data, "isExistingVar", true);
    myDiagram.model.setDataProperty(data, "paramtext", "");
    myDiagram.commitTransaction("makeDropdown");
  }

  function activateNewVar(arg) {
    myDiagram.startTransaction("makeTextField1");
    const data = arg.data;
    console.log(data);
    myDiagram.model.setDataProperty(data, "isExistingVar", false);
    myDiagram.model.setDataProperty(data, "paramtext", "");
    myDiagram.commitTransaction("makeTextField1");
  }