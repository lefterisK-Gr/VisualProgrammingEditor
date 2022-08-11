
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
      desiredSize: new go.Size(80, 50),
      strokeWidth: 2
    };
  }

  function functionStyle(shapeColor, functionName) {
    return [
      selectionStyle(),
      $(go.Shape, {figure: "Rectangle"}, nodeFunctionShapeStyle(),
        { fill: shapeColor }
      ),
      $(go.TextBlock, functionName, textStyle()
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