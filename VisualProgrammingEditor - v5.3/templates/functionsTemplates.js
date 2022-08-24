    var orangegrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
    var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
    var bluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
    var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(230, 230, 0)" });
    
    // define templates for each type of node
    var assignTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(orangegrad,"ASSIGN"));
    var printTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(orangegrad,"PRINT"));
    var operatorTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(yellowgrad,"OPERATION"));
    var varsTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(bluegrad,"VARS"));
    var ifTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"IF"));
    var whileTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"WHILE"));
    var forTemplate =
    $(go.Node, "Spot", nodeFunctionStyle(greengrad,"FOR"));
    
    
    var assignGroupTemplate = 
    $(go.Group, groupFunctionStyle(orangegrad,"ASSIGN"));
    var printGroupTemplate = 
    $(go.Group, groupFunctionStyle(orangegrad,"PRINT"));
    var plusGroupTemplate = 
    $(go.Group, groupFunctionStyle(yellowgrad,"OPERATOR"));
    var varsGroupTemplate = 
    $(go.Group, groupFunctionStyle(bluegrad,"VARS"));
    var ifGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"IF"));
    var whileGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"WHILE"));
    var forGroupTemplate = 
    $(go.Group, groupFunctionStyle(greengrad,"FOR"));


