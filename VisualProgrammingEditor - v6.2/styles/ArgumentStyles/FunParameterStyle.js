function funCodeParamStyle() {
  return [
    $(go.Shape, "Rectangle", argShapeStyle(),
      {fill: argFixedColor}
    ),
    {
      alignment: go.Spot.BottomLeft,
      alignmentFocus: go.Spot.TopLeft
    },
    $(go.Panel, "Table",
      {
        defaultAlignment: go.Spot.Left,
        defaultColumnSeparatorStroke: "gray" //overriden by stroke of shape
      },
      $(go.RowColumnDefinition, { column: 0, width: 40 }),
      $(go.RowColumnDefinition, { column: 1, width: 120 }),
      $(go.TextBlock,"( )", //portId lport
        {row: 0, column: 0, width: 30 }, //width less than 40 cause of margin
        {margin: new go.Margin(2, 5, 2, 5)}
      ),
      $(go.Panel, "Auto",
        {row: 0, column: 1, alignment: go.Spot.Right},
        $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port
          {portId: "( )"},
          { fill: "blue"}
        )
      ),
      $(go.Panel, "Auto", //textfield
        {row:0, column: 1, alignment: go.Spot.Center},
        $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("visible", "isport", function(v) {return !v})
        ),
      ),
    ),
  ]
}

function parametersStyle() {
  return [
  new go.Binding("visible"),
  new go.Binding("visible", "key", function(v, node) {
    if(myDiagram.findNodeForKey(v)) {
      return true
    }
    return false;
  }).ofObject(),
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  selectionStyle(), 
  $(go.Panel, "Auto",
    $(go.Shape, "Rectangle", { fill: "transparent"},
      new go.Binding("stroke", "isHighlighted", h => h ? "#7F00FF" : null).ofObject(),
      new go.Binding("strokeWidth", "isHighlighted", h => h ? 8 : 2).ofObject()
    ),
    $(go.Panel, "Spot", 
      $(go.Panel, "Table", {name: "ARGS",},
          new go.Binding("itemArray", "items"),
          new go.Binding("itemTemplate", "type", function(v) {
            return funParamTemplate;
          })
      ),
      funParamCodeTemplate
    )
  )
  ,signsButton(false),
  ]
}