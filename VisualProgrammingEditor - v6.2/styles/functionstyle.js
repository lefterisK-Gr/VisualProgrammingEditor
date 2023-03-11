  
  function nodeFunctionShapeStyle(isSmallerBox) {
    return [{
      name: "NODESHAPE",
      fill: "lightgray", //default color
      desiredSize: isSmallerBox ? new go.Size(105, 30) : new go.Size(105, 40),
      strokeWidth: 2,
      parameter1: 10
    },
    new go.Binding("stroke", "isHighlighted", h => h ? "#7F00FF" : "darkslategray").ofObject(),
    new go.Binding("strokeWidth", "isHighlighted", h => h ? 8 : 2).ofObject(),
    new go.Binding("fill", "fillCol")
  ];
  }

  function setOperationProp(functionName, isGoup) {
    if(functionName.endsWith("OP") && !isGoup) {
      return [{
        textEditor: window.OperatorEditorSelectBox,
        name: "OPERATION",
        editable: true,
        choices: Object.getOwnPropertyNames(choiceOperatorPropMap[functionName]),
        width: 40, height: 20,
        textAlign: "center",
        verticalAlignment: go.Spot.Center,
      },
      new go.Binding("text", "alias").makeTwoWay()]
    }
    return {}
  }

  function setCallProp(functionName, isGroup) {
    if( (functionName == "CALL") && !isGroup ) {
      return [{
        text: "NAME",
        textEditor: window.CallEditorSelectBox,
        name: "CALLTEXT",
        editable: true,
        width: 80, height: 20,
        background: "white",
        textAlign: "center",
        verticalAlignment: go.Spot.Center,
      },
      new go.Binding("choices", "key", levelFunctionNamesIntellisense).ofObject(),
      new go.Binding("text", "ident").makeTwoWay()
    ]
    }
    return {}
  }

  function functionBoxTextUpdate(functionName, isGroup) {
    if((functionName == "FUNCTION") && !isGroup) {
      return[
        {
          text: "NAME",
          width: 80, height: 20,
          background: "white",
          textAlign: "center",
          verticalAlignment: go.Spot.Center
        },
        new go.Binding("text", "ident").makeTwoWay(),
        {
        textEdited: function(tb, olds, news) {
          updateDecls();
          
          updateCalls();
        }
      }]
    }
    return {}
  }

  function setCallBorder(functionName, isGroup) {
    if( ((functionName == "CALL") || (functionName == "FUNCTION")) && !isGroup ) {
      return [
        $(go.Shape, "Rectangle",
        { 
          strokeWidth: 4,
          spot1: new go.Spot(0, 0), spot2: new go.Spot(1, 1) 
        }),
    ]
    }
    return {}
  }

  function setNodeTopName(functionName, isGroup) {
    if( ((functionName == "CALL") || (functionName == "FUNCTION")) && !isGroup ) {
      return [
        $(go.TextBlock,
          {
            name: "NONETOPNAMETEXTBLOCK",
            text: functionName,
            width: 100,
            textAlign: "center",
            alignment: new go.Spot(0.5, 0.1),
            font: "bold 9pt Lato, Helvetica, Arial, sans-serif",
            stroke: "#636363"
          },
        ),
    ]
    }
    return {}
  }

  function functionBoxStyle(functionName, isGroup) {
    if(functionName.endsWith("OP") && !isGroup) {
      return $(go.Shape,"Circle", 
        {
          width: 50,
          height: 50,
          fill: "lightgray"
        },
        new go.Binding("stroke", "isHighlighted", h => h ? "#7F00FF" : "darkslategray").ofObject(),
        new go.Binding("strokeWidth", "isHighlighted", h => h ? 8 : 2).ofObject(),
        new go.Binding("fill", "fillCol")
        );
    }
    if((functionName == "BREAK") || (functionName == "CONTINUE") || (functionName == "RETURN")) {
      return $(go.Shape, nodeFunctionShapeStyle(true),
        {
          figure: "RoundedRectangle",
          fill: "lightgray"
        },
        new go.Binding("fill", "fillCol")
      )
    }
    return $(go.Shape, nodeFunctionShapeStyle(false),
      {
        figure: "RoundedRectangle",
        fill: "lightgray"
      },  
      new go.Binding("fill", "fillCol")
    )
  }

  function functionStyle(functionName, isGroup) {
    return [
      selectionStyle(),
      functionBoxStyle(functionName, isGroup),
      setNodeTopName(functionName, isGroup),
      $(go.Panel, "Auto",
        setCallBorder(functionName, isGroup), 
        $(go.TextBlock,
          {name: "TEXTBLOCK", text: functionName, width: 100, textAlign: "center", editable: ((functionName == "FUNCTION") || (functionName == "CALL"))},
          textStyle(),
          functionBoxTextUpdate(functionName, isGroup),
          setOperationProp(functionName, isGroup),
          setCallProp(functionName, isGroup),
        )
        )
      
    ]
  }

  function portIdSize(isOp) {
    return isOp ? new go.Size(18,18) : new go.Size(18, 40);
  }

  function nodeFunctionStyle(functionName) {
    return [
      new go.Binding("visible", "key", function(v, node) {// show when dropping function
        if(myDiagram.findNodeForKey(v)) {
          return true
        }
        return false;
      }).ofObject(),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      functionStyle(functionName, false),
      $(go.Shape, "Ellipse", portStyle(true), // left in port
        { fill: "black", portId: "in", alignment: new go.Spot(0.05, 0.5) ,desiredSize: portIdSize(functionName.endsWith("OP") || (functionName == "BREAK") || (functionName == "CONTINUE") || (functionName == "RETURN"))}
      ),
      $("Button", 
        {
          height: 15, width: 15, alignment: new go.Spot(0.9 , 0.8)
        },
        $(go.Picture, "./images/dots.png", { name: "SETTINGSPIC", width: 11, height: 11}),
        {
          click: function(e, obj) {
            var node = obj.part;
            e.diagram.commandHandler.showContextMenu(node);
          }
        }
      ),
      $("Button",  // a replacement for "TreeExpanderButton" that works for non-tree-structured graphs
        // assume initially not visible because there are no links coming out
        // { visible: true },
        // // bind the button visibility to whether it's not a leaf node
        // new go.Binding("visible", "isTreeLeaf", leaf => !leaf).ofObject(),
        {
          alignment: new go.Spot(0.2, 0.2)
        },
        $(go.TextBlock, "i",
        {desiredSize: new go.Size(5,10)}),
        {
          click: (e, obj) => {
            e.diagram.startTransaction();
            var node = obj.part;
            
            if (node.data.isCommentCollapsed) {
              expandFrom(node, node);
            } else {
              if(node.data.isCommentCollapsed == undefined){
                node.data.isCommentCollapsed = false;
                addCommentAndLink(e, obj)
              }
              else
                collapseFrom(node, node);
            }
            e.diagram.commitTransaction("toggled visibility of dependencies");
          }
        }),
      $("Button",
        {
          width: 12,
          height: 12,
          margin: 2,
          // set properties on the border Shape of the "Button"
          "ButtonBorder.figure": "Circle",
          "ButtonBorder.fill": "red",
          // set properties on the "Button" itself used by its event handlers
          "_buttonFillOver": "red",
          click: (e, obj) => activateBreakpoint(obj.part)
        },
        { alignment: new go.Spot(0.55, 0.8), visible: false},
        new go.Binding("visible", "breakpoint")
			),
      $(go.Picture, "./images/warning.png",
        {
          desiredSize: new go.Size(12, 12),
        },
        { alignment: new go.Spot(0.2, 0.8), visible: false},
        new go.Binding("visible", "hasError")
			),
      {
        mouseEnter: (e, obj) => {
          var node = obj.part;
          if(!node.data.breakpoint) {
            nodeBreakpointAdornment.adornedObject = node;
            node.addAdornment("mouseHover", nodeBreakpointAdornment);
          }
        }
      },
      {
        mouseLeave: (e, obj) => {
          var node = obj.part;
          nodeBreakpointAdornment.adornedObject = node;
          node.removeAdornment("mouseHover");
        }
      },
      $(go.TextBlock,  // the error label
        {
          alignment: go.Spot.Bottom,
          alignmentFocus: go.Spot.Top,
          margin: 4,
          width: 100,
          stroke: "white",
          font: "bold 12px sans-serif",
          background: '#FF4444'
        },
        new go.Binding("visible", "isSelected", function (v, shape) {
            return (shape.part.data.hasError && v) ? true : false
        }).ofObject(),
        new go.Binding("text", "hasError", function(v) {
          return v ? "Error " + v + errorTypes[v] : "";
        }))
    ];
  }

  function groupFunctionStyle(functionName) { 
    return [
      {layout: $(go.LayeredDigraphLayout, {layerSpacing: 50})},
      go.Panel.Auto,
      {
        //isSubGraphExpanded: false,  // only show the Group itself, not any of its members
        ungroupable: true
      },
      functionStyle(functionName, true)
    ]
  }

