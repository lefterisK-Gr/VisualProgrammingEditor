
// define some common property settings
function selectionStyle() {
    return [new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue",
    }];
  }

  function nodeFunctionShapeStyle() {
    return {
      name: "NODESHAPE",
      fill: "lightgray", //default color
      stroke: "darkslategray",
      desiredSize: new go.Size(105, 50),
      strokeWidth: 2
    };
  }

  function setOperationProp(functionName) {
    if(functionName == "OPERATION") {
      return {
        textEditor: window.TextEditorSelectBox,
        name: "OPERATION",
        editable: true,
        choices: ['+', '-', '==', '÷', 'x', '<', '<=', '>', '>='],
        text: `+`,
        width: 20, height: 20,
        textAlign: "center",
        verticalAlignment: go.Spot.Center
      }
    }
    return {}
  }

  function operationBox(functionName) {
    if(functionName == "OPERATION") {
      return $(go.Shape,"Circle", { width: 30, height: 30, fill: "#FFC63F"});
    }
    return {}
  }

  function functionStyle(shapeColor, functionName) {
    return [
      selectionStyle(),
      $(go.Shape, {figure: "Rectangle"}, nodeFunctionShapeStyle(),
        { fill: shapeColor }
      ),
      operationBox(functionName),
      $(go.TextBlock, {text: functionName}, textStyle(), setOperationProp(functionName)
      )
    ]
  }

  function nodeFunctionStyle(shapeColor, functionName) {
    return [
      functionStyle(shapeColor, functionName),
      $(go.Shape, "Rectangle", portStyle(true), 
        { portId: "in", opacity: 0.3,alignment: new go.Spot(0, 0.5), alignmentFocus: go.Spot.Left ,desiredSize: new go.Size(20, 50)}
      )
    ];
  }

  function groupFunctionStyle(shapeColor, functionName) { 
    return [
      go.Panel.Auto,
      {
        isSubGraphExpanded: false,  // only show the Group itself, not any of its members
        ungroupable: true
      },
      functionStyle(shapeColor, functionName)
    ]
  }

  function node_Var_ShapeStyle() {
    return {
      name: "NODEVARSHAPE",
      fill: "lightgray",
      stroke: "darkslategray",
      desiredSize: new go.Size(120, 20),
      strokeWidth: 2
    };
  }

  function textStyle() {
    return {
      font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
      stroke: "#000000"
    }
  }

  function portStyle(input) {
    return {
      desiredSize: new go.Size(20, 20),
      fill: "White",
      strokeWidth: 0,
      fromSpot: go.Spot.Right, //no need for this, tree layout makes that for nodes automatically
      fromLinkable: !input,
      toSpot: go.Spot.Left,
      toLinkable: input,
      toMaxLinks: 1,
      fromMaxLinks: 1,
      cursor: "pointer"
    };
  }

  function blockStyle(block_kind) {
    return [
        selectionStyle(), 
        {name: "blocks",
          deletable: (block_kind == block.stmt)
        },
        $(go.Panel, "Vertical",
          new go.Binding("itemArray","items"),
          {
            itemTemplate: 
              $(go.Panel,"Auto",
                $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
                  new go.Binding("portId", "portId"),
                  {desiredSize: new go.Size(40, 40), strokeWidth: 2, fill: blockFill(block_kind)}
                ),
                $(go.TextBlock,{editable: true},
                  new go.Binding("text", "portId"),
                  {stroke: blockTextStroke(block_kind)}
                )          
              )
          }
        ),
        $(go.Shape, "TriangleRight", portStyle(true),
          {
            portId: "in",
            desiredSize: new go.Size(20, 20),
            fill: "black",
            stroke: "blue", strokeWidth: 3,
            alignment: go.Spot.TopLeft,
            visible: (block_kind != block.main)
          }
        ),
        $(go.Shape, "Rectangle", 
          {
            desiredSize: new go.Size(20, 20),
            fill: "white",
            strokeWidth: 3,
            alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom
          }
        ),
        $(go.Panel, "Horizontal",
          {alignment: go.Spot.Bottom},
          $("Button",
            $(go.Shape, "PlusLine", { width: 10, height: 10 }),
            {
              name: "BUTTON", 
              click: (e, button) => addBlock(button.part)
            },
          ),
          $("Button",
            $(go.Shape, "MinusLine", { width: 10, height: 10 }),
            { 
              name: "BUTTON2", 
              click: (e, button) => removeBlock(button.part)
            },
          )   
        )
    ]
  }

  function blockFill(block_kind) {
    if(!block_kind){
      return darkbluegrad;
    } else if (block_kind == block.stmt)
    {
      return whitegrad;
    }
    return cyangrad;
    
  }

  function blockTextStroke(block_kind) {
    if(!block_kind) {
      return "white";
    }
    return "black";
  }