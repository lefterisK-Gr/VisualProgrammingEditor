function varDeclArgStyle() {
  return [
      {background: "transparent"},
      $(go.Shape, "TriangleRight", {
        desiredSize: new go.Size(10, 10), 
        fill: "white", 
        stroke: null, 
        fill: null, 
        column: 0 
      }),
      $(go.TextBlock,  //portId
        {column: 0, width: 30},
        {margin: new go.Margin(2, 5, 2, 5),
          font: "bold 12pt sans-serif"},
        new go.Binding("text", "portId")
      ),
      $(go.TextBlock, //var text
        {editable: true, column: 1, width: 60, background: lightergray},
        {margin: new go.Margin(2, 5, 2, 5)},
        {
          textEdited: function(tb, olds, news) {
            updateDecls();

            updateVars();
          }
        },
        new go.Binding("text", "variable").makeTwoWay()
      ),
      $(go.Panel, "Auto",
        { column: 2, alignment: go.Spot.Right},
        $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port
          new go.Binding("portId", "portId"),
          { fill: "black", visible: false},
          new go.Binding("visible", "isport")
        )
      ),
      $(go.Panel, "Auto", //textfield
        {column: 2, alignment: go.Spot.Center},
        $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("visible", "isport", function(v) {return !v})
        ),
      ),
      {
        click: (e, obj) => {
          console.log("okey")
          onArgClick(e, obj, settingsAdornmentMap["DEFAULT ARGUMENT"]);
        }
      }
  ]
}