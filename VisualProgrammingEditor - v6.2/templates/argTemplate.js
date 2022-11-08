
  const argDefaultColor = "lightgray";
  const argDefaultStroke = "darkslategray";
  const argFixedColor = "#6BCEFF";

  const mouseSettingsSelect = "mouseSettingsSelect"
  const settingsMenuSelect = "settingsMenuSelect"

  const UnselectedBrush = "transparent";  // item appearance, if not "selected"
  const SelectedBrush = "orange";   // item appearance, if "selected"
  
  //argument row style
  var argTemplate =         $(go.Panel, "Auto", argStyle());
  var varDeclArgTemplate =  $(go.Panel, "Auto", varDeclArgStyle());
  var varArgTemplate =      $(go.Panel, "Auto", varArgStyle());
  var getElemArgTemplate =  $(go.Panel, "Auto", getElemArgStyle());

  //argument table style
  var argsTemplate =        $(go.Node, "Vertical", argsStyle());
  var varDeclArgsTemplate = $(go.Node, "Vertical", argsStyle()); //maybe change this
  var varArgsTemplate =     $(go.Node, "Vertical", varArgsStyle());
  var getElemArgsTemplate = $(go.Node, "Vertical", argsStyle());
  
  const settingsAdornmentMap = {
    "DEFAULT ARGUMENT" : 0,
    "VAR ARGUMENT" : 1,
    "GET ELEMENT ARGUMENT" : 2
  }
  //THIS FILE CONTAINS THE FUNCTIONALITIES OF ARGS

  function canHaveButton(node, isPlus) { //move this to template
    const data = node.data;
    const arr = data.items;
    if ( isPlus && data.arity && (data.arity.to === arr.length) ) {
      return false;
    } 
    else if ( !isPlus && data.arity && (data.arity.from === arr.length)) {
      return false;
    }
    return true;
  }

  function settingsAdornment(argType) {
    return [
      $(go.Placeholder),
        $("Button",
          {alignment: go.Spot.Right, alignmentFocus: go.Spot.Left, },
          $(go.Picture, "./images/settings.png", { name: "SETTINGSPIC", width: 16, height: 16}),
          {
            click: (e, button) => { //change adornments
              var node = button.part.adornedObject;
              node.part.removeAdornment(mouseSettingsSelect);
              node.part.removeAdornment(settingsMenuSelect);
              if(argType == 0){
                argHoverAdornment.adornedObject = node;
                node.part.addAdornment(settingsMenuSelect, argHoverAdornment);
              }
              else if(argType == 1) {
                varArgHoverAdornment.adornedObject = node;
                node.part.addAdornment(settingsMenuSelect, varArgHoverAdornment);
              }
              else { //2
                getElemArgHoverAdornment.adornedObject = node;
                node.part.addAdornment(settingsMenuSelect, getElemArgHoverAdornment);
              }
            }
          }
        )
    ]
  }

  var argSettingsAdornment = //adornment is on whole node
      $(go.Adornment, "Spot", settingsAdornment(settingsAdornmentMap["DEFAULT ARGUMENT"]));

  var varArgSettingsAdornment =
      $(go.Adornment, "Spot", settingsAdornment(settingsAdornmentMap["VAR ARGUMENT"]));

  var getElemArgSettingsAdornment =
      $(go.Adornment, "Spot", settingsAdornment(settingsAdornmentMap["GET ELEMENT ARGUMENT"]));

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

  var getElemArgHoverAdornment =
      $(go.Adornment, "Spot",
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
          { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.BottomLeft },
          new go.Binding("visible", "color", function(v) { return false;}),
          { click: (e, obj) => activateExistingVar(obj.part.adornedObject) },
          $(go.TextBlock, "Add suggested variable")),
      $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
          new go.Binding("visible", "color", function(v) { return false;}),
          { click: (e, obj) => activatePort(obj.part.adornedObject) },
          $(go.TextBlock, "Add port")),
      $("Button",
          { alignment: go.Spot.BottomRight, alignmentFocus: go.Spot.TopLeft },
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
  
  function onArgClick(e, item, varType) {
    var oldskips = item.diagram.skipsUndoManager;
    var node = item; 
    item.diagram.skipsUndoManager = true;
    if (!isArgSelected(item.elt(0))) {
      // deselect all sibling items      
      myDiagram.nodes.each(function (n) {
        if(n.data.type == "args" || n.data.type == "var" || n.data.type == "decl" || n.data.type == "obj") {
          n.elt(0).elements.each(it => { //remove selection highlight
            setArgSelected(it.elt(0), false);
          });
        }
        n.removeAdornment(settingsMenuSelect); //idk why this need to remove exclusively from each node
        n.removeAdornment(mouseSettingsSelect);
      })
      setArgSelected(item.elt(0), true);
      item.part.isSelected = true;
      
      //settings adornment 
      if(varType == 0) {
        argSettingsAdornment.adornedObject = node;
        node.part.addAdornment(mouseSettingsSelect, argSettingsAdornment);//argHoverAdornment
      }
      else if(varType == 1){
        varArgSettingsAdornment.adornedObject = node; //maybe make function
        node.part.addAdornment(mouseSettingsSelect, varArgSettingsAdornment);//varArgHoverAdornment
      }
      else if (varType == 2) {
        getElemArgSettingsAdornment.adornedObject = node; //maybe make function
        node.part.addAdornment(mouseSettingsSelect, getElemArgSettingsAdornment);//varArgHoverAdornment
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
    
    console.log(arg.data);
    let i = 1;
    var name;
    if(arg.data.type == "obj") {
      const objKeyStr = "key";
      while (arg.findPort( objKeyStr + i.toString() ) !== arg) 
      {
        i++;
      }
      name = objKeyStr + i.toString();
    }
    else {
      while (arg.findPort( i.toString() ) !== arg) 
      {
        i++;
      }
      name = i.toString();
    }
    
    const arr = arg.data.items;
    if(arg.data.arity && arg.data.arity.to && arr.length == arg.data.arity.to)
      return;

    myDiagram.startTransaction("add argument"); 
    if (arr) {
      // create a new port data object
      const newportdata = {
        portId: name //portId defines name of arg
      };
      // and add it to the end of Array of port data
      myDiagram.model.insertArrayItem(arr, -1, newportdata);
    }
    arg.updateTargetBindings("isEnabled");
    myDiagram.commitTransaction("add argument");
  }

  function removeArg(arg) {
    if (!arg) return;
    var arr = arg.data.items;
    if(arg.data.arity && arg.data.arity.from && arr.length == arg.data.arity.from)
      return;
    
    myDiagram.startTransaction("remove argument");
    myDiagram.model.removeArrayItem(arr);
    arg.updateTargetBindings("isEnabled");
    myDiagram.commitTransaction("remove argument");
  }

  function activatePort(arg) {
    myDiagram.startTransaction("makePort");
    const data = arg.data;
    myDiagram.model.setDataProperty(data, "isport", true);
    myDiagram.commitTransaction("makePort");
  }

  function activateTextField(arg) {
    myDiagram.startTransaction("makeTextField");
    const data = arg.data;  
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
    myDiagram.model.setDataProperty(data, "isExistingVar", true);
    myDiagram.model.setDataProperty(data, "paramtext", "");
    myDiagram.commitTransaction("makeDropdown");
  }

  function activateNewVar(arg) {
    myDiagram.startTransaction("makeTextField1");
    const data = arg.data; //make fun
    myDiagram.model.setDataProperty(data, "isExistingVar", false);
    myDiagram.model.setDataProperty(data, "paramtext", "");
    myDiagram.commitTransaction("makeTextField1");
  }

  function argChoicesIntellisense(v, args) {
    var nDeclared;
    var i = 0;
    var vobj

    stackFrames.some(stackFrame => {
      if(stackFrame.refs.indexOf(args.part.findLinksInto().first().data.from) >= 0)
      { 
        nDeclared = stackFrame.variables;
        return true;
      }
    });
    
    while(i < v) { // v is current itemIndex
      tempIndex = args.part.data.items[i].paramtext;
      if( !tempIndex ) break;
      vobj = (typeof nDeclared[tempIndex] == 'string') ? JSON.parse(nDeclared[tempIndex]) : nDeclared[tempIndex]

      if(typeof vobj === 'object'){
        nDeclared = vobj
      }
      i++;
    }
    return nDeclared ? Object.keys(nDeclared) : null;
  }