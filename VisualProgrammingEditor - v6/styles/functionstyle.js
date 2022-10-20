  
  function nodeFunctionShapeStyle() {
    return {
      name: "NODESHAPE",
      fill: "lightgray", //default color
      stroke: "darkslategray",
      desiredSize: new go.Size(105, 50),
      strokeWidth: 2,
      parameter1: 10
    };
  }

  function setOperationProp(functionName, isGoup) {
    var functionNameType = functionName.split(" ");
    if(functionNameType[1] == "OP" && !isGoup) {
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
    var functionNameType = functionName.split(" ");
    if(functionNameType[1] == "OP" && !isGroup) {
      return $(go.Shape,"Circle", { width: 50, height: 50, fill: shapeColor});
    }
    return $(go.Shape, nodeFunctionShapeStyle(),{ figure: "RoundedRectangle", fill: shapeColor })
  }

  function functionStyle(shapeColor, functionName, isGroup) {
    return [
      selectionStyle(),
      functionBoxStyle(functionName, shapeColor, isGroup),
      $(go.TextBlock, {text: functionName, width: 100, textAlign: "center"}, textStyle(), setOperationProp(functionName, isGroup))
    ]
  }

  function nodeFunctionStyle(shapeColor, functionName) {
    return [
      functionStyle(shapeColor, functionName, false),
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
      functionStyle(shapeColor, functionName, true)
    ]
  }

