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

  function setOperationProp(functionName) {
    var functionNameType = functionName.split(" ");
    if(functionNameType[1] == "OP") {
      return {
        textEditor: window.OperatorEditorSelectBox,
        name: "OPERATION",
        editable: true,
        choices: Object.getOwnPropertyNames(operatorNameMap[functionName]),
        //text: `+`, //overwrite
        width: 20, height: 20,
        textAlign: "center",
        verticalAlignment: go.Spot.Center
      },
      new go.Binding("text", "alias")
    }
    return {}
  }

  function functionBoxStyle(functionName, shapeColor) {
    var functionNameType = functionName.split(" ");
    if(functionNameType[1] == "OP") {
      return $(go.Shape,"Circle", { width: 50, height: 50, fill: shapeColor});
    }
    return $(go.Shape, nodeFunctionShapeStyle(),{ figure: "RoundedRectangle", fill: shapeColor })
  }

  function functionStyle(shapeColor, functionName) {
    return [
      selectionStyle(),
      functionBoxStyle(functionName, shapeColor),
      $(go.TextBlock, {text: functionName, isMultiline: true, textAlign: "center"}, textStyle(), setOperationProp(functionName))
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

