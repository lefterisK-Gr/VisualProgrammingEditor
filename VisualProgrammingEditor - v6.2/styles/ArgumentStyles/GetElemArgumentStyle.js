function getElemArgStyle() {
  return [
    $(go.Shape, "Rectangle", argShapeStyle(),
      new go.Binding("fill", "itemIndex", function(v, shape) {
          if( v < shape.part.data.arity.from)
              return argFixedColor;
          return argDefaultColor;
      }).ofObject()
    ),
    $(go.Panel, "Table",
      {
        defaultAlignment: go.Spot.Left,
        defaultColumnSeparatorStroke: "gray" //overriden by stroke of shape
      },
      $(go.RowColumnDefinition, { column: 0, width: 40 }),
      $(go.RowColumnDefinition, { column: 1, width: 105 }),
      $(go.TextBlock, //portId lport
        {row: 0, column: 0, width: 30 }, //width less than 40 cause of margin
        {margin: new go.Margin(2, 5, 2, 5)},
        new go.Binding("text", "portId")
      ),
      $(go.Panel, "Auto",
        {row: 0, column: 1, alignment: go.Spot.Right},
        $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port
          new go.Binding("portId", "portId"),
          { fill: "black", visible: false},
          new go.Binding("visible", "isport")
        )
      ),
      $(go.Panel, "Auto", //textfield
        {row:0, column: 1, alignment: go.Spot.Center},
        $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("visible", "isport", function(v) {return !v})
        ),
      ),
      selectableArgStyle("Key"),
    ),
    {
      click: (e, obj) => {
        onArgClick(e, obj, settingsAdornmentMap["GET ELEMENT ARGUMENT"]);
      }
    }
  ]
}