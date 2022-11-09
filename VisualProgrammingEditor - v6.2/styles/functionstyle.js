  
  function nodeFunctionShapeStyle(isSmallerBox) {
    return {
      name: "NODESHAPE",
      fill: "lightgray", //default color
      stroke: "darkslategray",
      desiredSize: isSmallerBox ? new go.Size(105, 30) : new go.Size(105, 40),
      strokeWidth: 2,
      parameter1: 10
    };
  }

  function setOperationProp(functionName, isGoup) {
    if(functionName.endsWith("OP") && !isGoup) {
      return [{
        textEditor: window.OperatorEditorSelectBox,
        name: "OPERATION",
        editable: true,
        choices: Object.getOwnPropertyNames(operatorNameMap[functionName]),
        width: 30, height: 30,
        textAlign: "center",
        verticalAlignment: go.Spot.Center,
      },
      new go.Binding("text", "alias")]
    }
    return {}
  }

  function functionBoxStyle(functionName, shapeColor, isGroup) {
    if(functionName.endsWith("OP") && !isGroup) {
      return $(go.Shape,"Circle", { width: 50, height: 50, fill: shapeColor});
    }
    if((functionName == "BREAK") || (functionName == "CONTINUE")) {
      return $(go.Shape, nodeFunctionShapeStyle(true),{ figure: "RoundedRectangle", fill: shapeColor })
    }
    return $(go.Shape, nodeFunctionShapeStyle(false),{ figure: "RoundedRectangle", fill: shapeColor })
  }

  function functionStyle(shapeColor, functionName, isGroup) {
    return [
      selectionStyle(),
      functionBoxStyle(functionName, shapeColor, isGroup),
      $(go.TextBlock, {text: functionName, width: 100, textAlign: "center"}, textStyle(), setOperationProp(functionName, isGroup))
    ]
  }

  function portIdSize(isOp) {
    return isOp ? new go.Size(18,18) : new go.Size(18, 40);
  }

  function nodeFunctionStyle(shapeColor, functionName) {
    return [
      functionStyle(shapeColor, functionName, false),
      $(go.Shape, "Ellipse", portStyle(true), 
        { fill: "black", portId: "in", alignment: new go.Spot(0.05, 0.5) ,desiredSize: portIdSize(functionName.endsWith("OP") || (functionName == "BREAK") || (functionName == "CONTINUE"))}
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
      functionStyle(shapeColor, functionName, true)
    ]
  }

