function argShapeStyle() {
    return {
      name: "NODEARGSHAPE",
      fill:  "lightgray",
      stroke: "darkslategray",
      desiredSize: new go.Size(120, 20),
      strokeWidth: 2
    };
  }

function argVarShapeStyle(isBigger) {
    return {
        name: "NODEVARARGSHAPE",
        fill:  "lightgray",
        stroke: "darkslategray",
        desiredSize: isBigger ? new go.Size(60, 20) : new go.Size(40, 20),
        strokeWidth: 2
    };
}

function argsStyle() {
    return [
    selectionStyle(), 
    $(go.Panel, "Vertical",
        new go.Binding("itemArray", "items"),
        new go.Binding("itemTemplate", "group", function(v) {
            if(v == "varsDeclGroupKey")
                return varDeclArgTemplate;
            else if(v == "varsReferGroupKey")
                return varArgTemplate;
            return argTemplate;
        })
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

function argStyle() {
    return [
        $(go.Shape, "Rectangle", argShapeStyle(),
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

function varDeclArgStyle() {
    return [
        $(go.Shape, "Rectangle",
          { name: "SHAPE", fill: "lightgrey", stroke: "darkslategray",strokeWidth: 2 }),
        $(go.Panel, "Table",
          {
            defaultAlignment: go.Spot.Left,
            defaultColumnSeparatorStroke: "gray"
          },
          $(go.RowColumnDefinition, { column: 0, width: 40 }),
          $(go.RowColumnDefinition, { column: 1, width: 80 }),
          $(go.RowColumnDefinition, { column: 2, width: 80 }),
          $(go.RowColumnDefinition, { column: 1, background: "#E9E9E9" }),
          $(go.TextBlock, 
            {editable: true, row: 0, column: 0, width: 30},
            {margin: new go.Margin(2, 5, 2, 5)},
            new go.Binding("text", "portId")
          ),
          $(go.TextBlock, 
            {editable: true, row: 0, column: 1, width: 60},
            {margin: new go.Margin(2, 5, 2, 5)},
            new go.Binding("text", "variable").makeTwoWay()
          ),
          $(go.Panel, "Auto",
            {row: 0, column: 2,alignment: go.Spot.Right},
            $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
              new go.Binding("portId", "portId"),
              { opacity: 0.3, visible: false},
              new go.Binding("visible", "isport")
            )
          ),
          $(go.Panel, "Auto",
            {row:0, column: 2, alignment: go.Spot.Center},
            $(go.TextBlock, {editable: true, alignment: go.Spot.Right, margin: new go.Margin(0,5,0,0), visible: false, background: "white", width: 50},
              new go.Binding("text", "paramtext").makeTwoWay(),
              new go.Binding("visible", "isport", function(v) {return !v})
            ),
          )
        ),
      {
        mouseEnter: (e, obj) => {
            var node = obj;
            console.log(node.data);
            obj.part.removeAdornment("mouseEnter");
            
            argHoverAdornment.adornedObject = node;
            node.part.addAdornment("mouseEnter", argHoverAdornment);
            }
      }
    ]
}

function varArgStyle() {
  return [
    $(go.Shape, { fill: "lightgrey" }),
    $(go.TextBlock, "an example using FontAwesome", {editable: true, width: 100, margin: 5, background: "#E9E9E9"})
  ]
}