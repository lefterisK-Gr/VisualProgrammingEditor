
  const argDefaultColor = "lightgray";
  const argDefaultStroke = "darkslategray";
  const isArgFixedColor = "#6BCEFF";

  const mouseSettingsSelect = "mouseSettingsSelect"
  const settingsMenuSelect = "settingsMenuSelect"

  const UnselectedBrush = "transparent";  // item appearance, if not "selected"
  const SelectedBrush = "orange";   // item appearance, if "selected"
  
  var argTemplate = $(go.Panel,"Auto", {name: "ARGTEMPLATE"}, argStyle());
  var varDeclArgTemplate = $(go.Panel,"Auto", varDeclArgStyle());
  var varArgTemplate = $(go.Panel,"Auto", varArgStyle());

  var argsTemplate = $(go.Node,"Vertical", argsStyle());
  
  function settingsAdornment(isVarRef) {
    return [
      $(go.Placeholder),
        $("Button",
          {alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, },
          $(go.Picture, "./images/settings.png", { name: "SETTINGSPIC", width: 16, height: 16}),
          {
            click: (e, button) => { //change adornments
              var node = button.part.adornedObject;
              console.log(node);
              node.part.removeAdornment(mouseSettingsSelect);
              node.part.removeAdornment(settingsMenuSelect);
              if(isVarRef) {
                varArgHoverAdornment.adornedObject = node;
                node.part.addAdornment(settingsMenuSelect, varArgHoverAdornment);
              }
              else {
                argHoverAdornment.adornedObject = node;
                node.part.addAdornment(settingsMenuSelect, argHoverAdornment);
              }
            }
          }
        )
    ]
  }

  var argSettingsAdornment = //adornment is on whole node
      $(go.Adornment, "Spot", settingsAdornment(false));

  var varArgSettingsAdornment = //make this function
      $(go.Adornment, "Spot", settingsAdornment(true));

  var argHoverAdornment = //change name
      $(go.Adornment, "Spot",
        new go.Binding("visible", "", function() {return true}),
        new go.Binding("visible", "connectedBlock", function(v) {return !v}),
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
      $(go.Placeholder,
        {
          //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
          isActionable: true,  // needed because this is in a temporary Layer
          click: (e, obj) => { // what does this do?
              var node = obj.part.adornedPart;
              node.diagram.select(node);
          }
      }),
      $("Button", //make these function
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
  
  function onArgClick(e, item, isVarRef) {
    var oldskips = item.diagram.skipsUndoManager;
    var node = item; 
    item.diagram.skipsUndoManager = true;
    if (!isArgSelected(item.elt(0))) {
      // deselect all sibling items      
      myDiagram.nodes.each(function (n) {
        if(n.data.type == "args") {
          n.elt(0).elements.each(it => {
            console.log(it.elt(0).stroke);
            setArgSelected(it.elt(0), false);
          });
        }
        n.removeAdornment(settingsMenuSelect); //idk why this need to remove exclusively from each node
        n.removeAdornment(mouseSettingsSelect);
      })
      setArgSelected(item.elt(0), true);
      item.part.isSelected = true;
      
      //settings adornment 
      if(isVarRef) {
        varArgSettingsAdornment.adornedObject = node; //maybe make function
        node.part.addAdornment(mouseSettingsSelect, varArgSettingsAdornment);//varArgHoverAdornment
      }
      else {
        argSettingsAdornment.adornedObject = node;
        node.part.addAdornment(mouseSettingsSelect, argSettingsAdornment);//argHoverAdornment
      }
    }
    else {
      setArgSelected(item.elt(0), false);
      item.part.isSelected = false;
      node.part.removeAdornment(mouseSettingsSelect);
      node.part.removeAdornment(settingsMenuSelect);
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
    console.log(data);
    //console.log(argnode.part.data); //arguments
    //remove connected links
    links = arg.part.findLinksOutOf();
    while(links.next()) {
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