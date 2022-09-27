function argsStyle() {
    return [
    selectionStyle(), 
    $(go.Panel, "Vertical",
    new go.Binding("itemArray", "items"),
    new go.Binding("itemTemplate", "key", function(v) {return argTemplate;})
    ),
    $(go.Panel, "Horizontal",
    {alignment: go.Spot.Left},
    $("Button",
        $(go.Shape, "PlusLine", { width: 10, height: 10 }),
        {
        name: "BUTTON", 
        click: (e, button) => addArg(button.part)
        },
    ),
    $("Button",
        $(go.Shape, "MinusLine", { width: 10, height: 10 }),
        { 
        name: "BUTTON2", 
        click: (e, button) => removeArg(button.part)
        }
    )   
    )
    ]
}

function argStyle(isVarDecl) {
    return [
        $(go.Shape, "Rectangle", node_Var_ShapeStyle(isVarDecl),
            new go.Binding("stroke", "itemIndex", function(v, shape) {
                if( v < shape.part.data.arity.from)
                    return "blue";
                return "darkslategray";
            }).ofObject(),
            new go.Binding("fill", "itemIndex", function(v, shape) {
                if( v < shape.part.data.arity.from)
                    return "#6BCEFF";
                return "lightgray";
            }).ofObject()),
          $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
            new go.Binding("portId", "portId"),
            { alignment: go.Spot.Right, alignmentFocus: go.Spot.Right ,opacity: 0.3, visible: false},
            new go.Binding("visible", "isport"),
            new go.Binding("visible", "connectedBlock")
          ), 
          $(go.TextBlock, {editable: true, alignment: go.Spot.Right, margin: new go.Margin(0,5,0,0), visible: false, background: "white", width: 50},
            new go.Binding("text", "paramtext").makeTwoWay(),
            new go.Binding("visible", "isport", function(v) {return !v})
          ),
          $(go.TextBlock, {editable: true, alignment: go.Spot.Left, margin: new go.Margin(0,0,0,10)},
            new go.Binding("text", "portId")
          ),
          {
            mouseEnter: (e, obj) => {
                var node = obj;
                //console.log(node.data);
                obj.part.removeAdornment("mouseEnter");
                
                argHoverAdornment.adornedObject = node;
                node.part.addAdornment("mouseEnter", argHoverAdornment);
              }
          }
    ]
}