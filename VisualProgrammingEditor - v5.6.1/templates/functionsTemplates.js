    var orangegrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
    var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
    var purplegrad = $(go.Brush, "Linear", { 0: "#9A00FF", 1: "#B84BFF" });
    var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(230, 230, 0)" });
    
    // define templates for each type of node
    var printTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(orangegrad,"PRINT"));
    var operatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowgrad,"OPERATION"));
    var varsDeclTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(bluegrad,"VAR DECL"));
    var varsReferTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(purplegrad,"VAR REFER"));
    var ifTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"IF"));
    var whileTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"WHILE"));
    var forTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"FOR"));
    
    
    var printGroupTemplate = 
    $(go.Group, groupFunctionStyle(orangegrad,"PRINT"));
    var operatorGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowgrad,"OPERATOR"));
    var varsDeclGroupTemplate = 
    $(go.Group, groupFunctionStyle(bluegrad,"VAR DECL"));
    var varsReferGroupTemplate = 
    $(go.Group, groupFunctionStyle(purplegrad,"VAR REFER"));
    var ifGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"IF"));
    var whileGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"WHILE"));
    var forGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"FOR"));


