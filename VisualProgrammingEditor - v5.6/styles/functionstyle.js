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

  function node_Var_ShapeStyle(isVarDecl) {
    return {
      name: "NODEVARSHAPE",
      fill: isVarDecl ? "red" : "lightgray",
      stroke: "darkslategray",
      desiredSize: new go.Size(120, 20),
      strokeWidth: 2
    };
  }