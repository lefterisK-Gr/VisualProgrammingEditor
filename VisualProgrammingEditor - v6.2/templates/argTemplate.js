
  const argDefaultColor = "lightgray";
  const argDefaultStroke = "darkslategray";
  const argFixedColor = "#6BCEFF";

  const mouseSettingsSelect = "mouseSettingsSelect"
  const settingsMenuSelect = "settingsMenuSelect"

  const UnselectedBrush = "transparent";  // item appearance, if not "selected"
  const SelectedBrush = "orange";   // item appearance, if "selected"
  
  //argument row style
  var argTemplate =         $(go.Panel, "TableRow", argStyle());
  var varDeclArgTemplate =  $(go.Panel, "Auto", varDeclArgStyle());//add parameter to varArg so change binding to parameter
  var varArgTemplate =      $(go.Panel, "Auto", varArgStyle());   
  var getElemArgTemplate =  $(go.Panel, "Auto", getElemArgStyle());

  var funParamTemplate =    $(go.Panel, "Auto", varDeclArgStyle())
  var funParamCodeTemplate =$(go.Panel, "Auto", funCodeParamStyle())
  //argument table style
  var argsTemplate =        $(go.Node, "Vertical", argsStyle());
  var varDeclArgsTemplate = $(go.Node, "Vertical", argsStyle()); //maybe change this??
  var varArgsTemplate =     $(go.Node, "Vertical", argsStyle());
  var getElemArgsTemplate = $(go.Node, "Vertical", argsStyle());
  
  var funParamsTemplate =   $(go.Node, "Horizontal", parametersStyle());
  
  const settingsAdornmentMap = {
    "DEFAULT ARGUMENT" : 0,
    "VAR ARGUMENT" : 1,
    "GET ELEMENT ARGUMENT" : 2
  }
  //THIS FILE CONTAINS THE FUNCTIONALITIES OF ARGS

  function canHaveButton(node, isPlus) {
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

  function canHaveValue(adorn) {
    console.log(adorn.data)
    if(adorn.data.isport) {
      return true;
    }
    return false;
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
          $(go.Panel, "Vertical",
            { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
            $("Button",
              {width: 60},
              new go.Binding("visible", "color", function(v) { return false;}),
              { click: (e, obj) => activatePort(obj.part.adornedObject) },
              $(go.Picture, "./images/arrow.png", { name: "LINKCHAINPIC", width: 30, height: 11})
            ),
            $("Button",
              {width: 60},
              { click: (e, obj) => {
                activateTextField(obj.part.adornedObject)} 
              },
              $(go.TextBlock, "="),
              new go.Binding("visible", "", canHaveValue).ofObject()),
            $("Button",
              {width: 60},
              { click: (e, obj) => {
                moveArg(obj.part.adornedObject, true)} 
              },
              $(go.Shape, "Triangle", {width: 15, height: 15})),
            $("Button",
              {width: 60},
              { click: (e, obj) => {
                moveArg(obj.part.adornedObject, false)} 
              },
              $(go.Shape, "TriangleDown", {width: 15, height: 15}))
          )
        
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
      $(go.Panel, "Vertical",
        { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        $("Button", //make these function
            {width: 100},
            new go.Binding("visible", "color", function(v) { return false;}),
            { click: (e, obj) => activateExistingVar(obj.part.adornedObject) },
            $(go.TextBlock, "Add existing variable")),
        $("Button",
            {width: 100},
            { click: (e, obj) => {
              activateNewVar(obj.part.adornedObject)} 
            },
            $(go.TextBlock, "Add new variable"))
      )
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
      $(go.Panel, "Vertical",
        { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        $("Button", //make these function
            {width: 100},
            new go.Binding("visible", "color", function(v) { return false;}),
            { click: (e, obj) => activateExistingVar(obj.part.adornedObject) },
            $(go.TextBlock, "Add suggested variable")),
        $("Button",
            {width: 100},
            new go.Binding("visible", "color", function(v) { return false;}),
            { click: (e, obj) => activatePort(obj.part.adornedObject) },
            $(go.TextBlock, "Add port")),
        $("Button",
            {width: 100},
            { click: (e, obj) => {
              activateNewVar(obj.part.adornedObject)} 
            },
            $(go.TextBlock, "Add new variable"))
      )
      );

  function isArgSelected(item) {
    return item.fill !== null;
  }
      
  function setArgSelected(item, sel) {
    if (sel) {
      item.fill = SelectedBrush; //override
    } 
    else {
      item.fill = null;
    }
  }
  
  function onArgClick(e, item, varType) {
    var oldskips = item.diagram.skipsUndoManager;
    var node = item; 
    console.log(node);
    item.diagram.skipsUndoManager = true;
    if (!isArgSelected(item.elt(0))) {
      // deselect all sibling items      
      myDiagram.nodes.each(function (n) {
        if(n.data.type == "args" || n.data.type == "var" || n.data.type == "decl" || n.data.type == "propertyAccesors" || n.data.type == "parameters") {
          n.elt(0).elt(1).elements.each(it => { //remove selection highlight
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
    
    let i = 1;
    var name;
    if(arg.data.type == "propertyAccesors") {
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
    if (arr) { // since we have add button, there must be items so no need for if??
      var model = myDiagram.model;
      var newportdata;
      // newportdata in if Block
      const inLink = arg.findLinksInto();
      const blockConnected = myDiagram.findNodeForKey(inLink.first().data.from).data.type;
      if(blockConnected == "if") {
        newportdata = {
          portId: "else_part",
          isConnectedBlock: true
        }

        var connectedBlock = {type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true}]}
        var p = arg.location;
        connectedBlock.loc = (p.x + 200) + " " + (p.y + 100);
        model.addNodeData(connectedBlock);
        // and add it to the end of Array of port data
        model.insertArrayItem(arr, -1, newportdata);
        //add link to funBlock
        var linkdata = {fromPort: "else_part", toPort: "in"};
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(arg.part.data);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(connectedBlock);

        model.addLinkData(linkdata)
      }
      else { // create a new port data object
        newportdata = {
          portId: name //portId defines name of arg
        };
        // and add it to the end of Array of port data
        model.insertArrayItem(arr, -1, newportdata);
      }
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
    //remove connectedBlock from elsePart
    outLink = arg.part.findLinksOutOf();
    while(outLink.next()) {
      if(outLink.value.data.fromPort == "else_part") {
        myDiagram.remove(myDiagram.findNodeForKey(outLink.value.data.to))
        break;
      }
    }
    myDiagram.model.removeArrayItem(arr);
    arg.updateTargetBindings("isEnabled");
    myDiagram.commitTransaction("remove argument");
  }

  function activatePort(arg) {
    myDiagram.startTransaction("makePort");
    const data = arg.data;
    myDiagram.model.setDataProperty(data, "isport", true);
    console.log(arg)
    arg.updateTargetBindings()
    const tool = myDiagram.toolManager.linkingTool;
    tool.startObject = arg.part.findPort(data.portId)
    myDiagram.currentTool = tool;
    tool.doActivate();
    myDiagram.commitTransaction("makePort");
  }

  function activateTextField(arg) {
    myDiagram.startTransaction("makeTextField");
    const data = arg.data;  
    //remove connected links
    links = arg.part.findLinksOutOf();
    while(links.next()) { //just needs links.first() since only one link exists
      if(links.value.data.fromPort == arg.data.portId){
        myDiagram.remove(links.value);
      }
    }
    myDiagram.model.setDataProperty(data, "isport", false);
    arg.updateTargetBindings()
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

  function moveArg(arg, up) {
    myDiagram.startTransaction("move argument");
    const data = arg.data;	
    const allArgs = arg.part;
    
    for(let i = 0; i < allArgs.data.items.length; i++) {
      var upperArg = up ? allArgs.data.items[i-1] : data;
      var underArg = up ? data : allArgs.data.items[i+1];
      if( (allArgs.data.items[i].portId == data.portId) && (up ? (i > 0) : (i < allArgs.data.items.length - 1) )) {
        const sourceParamtext = data.paramtext;	
        var upperArgLink;	
        var downArgLink;
        const targetParamText = underArg.paramtext;
        myDiagram.model.setDataProperty(data, "paramtext", targetParamText);
        myDiagram.model.setDataProperty(up ? upperArg : underArg, "paramtext", sourceParamtext);
        if(underArg.isport || upperArg.isport) {
          allArgs.findLinksOutOf().each(v=>{	
            if(v.data.fromPort == upperArg.portId) {	
              upperArgLink = v;	
            }	
            if(v.data.fromPort == underArg.portId) {	
              downArgLink = v;	
            }	
          })
        }
        if(upperArgLink) {	
          myDiagram.model.setFromPortIdForLinkData(upperArgLink.data, underArg.portId)	
          myDiagram.model.setDataProperty(underArg, "isport", true);	
          myDiagram.model.setDataProperty(upperArg, "isport", false);	
        }	
        if(downArgLink) {	
          myDiagram.model.setFromPortIdForLinkData(downArgLink.data, upperArg.portId)	
          myDiagram.model.setDataProperty(upperArg, "isport", true);	
          if(!upperArgLink) myDiagram.model.setDataProperty(underArg, "isport", false);	
        }
        break;
      }
    }
    myDiagram.commitTransaction("move argument");
  }

  function argChoicesIntellisense(v, args) {
    var nDeclared;
    var i = 0;
    var vobj

    stackFrames.some(stackFrame => {
      if(stackFrame.refs.indexOf(args.part.findLinksInto().first().data.from) >= 0)
      { 
        nDeclared = stackFrame.variables;
        return true; //no need
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