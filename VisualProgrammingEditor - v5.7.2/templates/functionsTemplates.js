    var orangegrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
    var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
    var purplegrad = $(go.Brush, "Linear", { 0: "#9A00FF", 1: "#B84BFF" });
    var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(255, 255, 102)" });
    var yellowgreengrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(102, 255, 102)" });
    var yellowbluegrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(102, 102, 255)" });
    var yellowredgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(255, 102, 102)" });
    var lightergray = "#E9E9E9";
    var darkergray = "#A0A0A0"

    const operatorNameMap = {
        "ARITHMETIC OP": arithmOperatorMap,
        "RELATIONAL OP": relationalOperatorMap,
        "UNARY OP": unaryOperatorMap,
        "BINARY OP": binaryOperatorMap,
    }

    // define templates for each type of node
    var printTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(orangegrad,"PRINT"));
    
    var operatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowgrad,"ARITHMETIC OP"));
    var relationalOperatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowgreengrad,"RELATIONAL OP"));
    var unaryOperatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowbluegrad,"UNARY OP"));
    var binaryOperatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowredgrad,"BINARY OP"));

    var varsDeclTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(bluegrad,"VAR DECL"));
    var varsReferTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(purplegrad,"VAR"));
    var ifTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"IF"));
    var whileTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"WHILE"));
    var forTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"FOR"));
    
    
    var printGroupTemplate = 
    $(go.Group, groupFunctionStyle(orangegrad,"PRINT"));

    var operatorGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowgrad,"ARITHMETIC\nOP"));
    var relationalOperatorGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowgreengrad,"RELATIONAL\nOP"));
    var unaryOperatorGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowbluegrad,"UNARY\nOP"));
    var binaryOperatorGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowredgrad,"BINARY\nOP"));

    var varsDeclGroupTemplate = 
    $(go.Group, groupFunctionStyle(bluegrad,"VAR DECL"));
    var varsReferGroupTemplate = 
    $(go.Group, groupFunctionStyle(purplegrad,"VAR"));
    var ifGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"IF"));
    var whileGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"WHILE"));
    var forGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"FOR"));


