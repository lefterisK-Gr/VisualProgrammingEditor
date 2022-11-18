function varDeclArgStyle() {
  return [
      $(go.Shape, "Rectangle", argShapeStyle()),
      $(go.Panel, "Table",
        {
          defaultAlignment: go.Spot.Left,
          defaultColumnSeparatorStroke: "gray"
        },
        $(go.RowColumnDefinition, { column: 0, width: 40 }),
        $(go.RowColumnDefinition, { column: 1, width: 80 }),
        $(go.RowColumnDefinition, { column: 2, width: 80 }),
        $(go.RowColumnDefinition, { column: 1, background: lightergray }),
        $(go.TextBlock,  //portId
          {editable: true, row: 0, column: 0, width: 30},
          {margin: new go.Margin(2, 5, 2, 5)},
          new go.Binding("text", "portId")
        ),
        $(go.TextBlock, //var text
          {editable: true, row: 0, column: 1, width: 60},
          {margin: new go.Margin(2, 5, 2, 5)},
          {
            textEdited: function(tb, olds, news) {
              updateDecls();

              myDiagram.nodes.each(function(n) {
                updateVar(n);
              });
            }
          },
          new go.Binding("text", "variable").makeTwoWay()
        ),
        $(go.Panel, "Auto",
          {row: 0, column: 2,alignment: go.Spot.Right},
          $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port
            new go.Binding("portId", "portId"),
            { fill: "black", visible: false},
            new go.Binding("visible", "isport")
          )
        ),
        $(go.Panel, "Auto", //textfield
          {row:0, column: 2, alignment: go.Spot.Center},
          $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
            new go.Binding("text", "paramtext").makeTwoWay(),
            new go.Binding("visible", "isport", function(v) {return !v})
          ),
        )
      ),
      {
        click: (e, obj) => {
          onArgClick(e, obj, settingsAdornmentMap["DEFAULT ARGUMENT"]);
        }
      }
  ]
}