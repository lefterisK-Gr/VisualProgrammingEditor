function varDeclArgStyle() {
  return [
      {background: "transparent"},
      new go.Binding("background", "itemIndex", function(v, shape) {
          if(!shape.data.variable) {
            return "#fc554c"
          }
          return argDefaultColor;
      }).ofObject(),
      $(go.Shape, "Rectangle",
        {column: 0, width: 10, height: 10, strokeWidth: 0, fill: "transparent", toSpot: go.Spot.Left, toLinkable: true},
        new go.Binding("portId", "portId", function(v) { return ("inSlot" + v)}),
      ),
      new go.Binding("portId", "portId", function(v) { return ("inSlot" + v)}),
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
            tb.part.updateTargetBindings();
          }
        },
        new go.Binding("text", "variable").makeTwoWay()
      ),
      $(go.Shape, "TriangleRight", 
      {
        desiredSize: new go.Size(10, 10), 
        fill: "white", 
        stroke: null, 
        fill: null, 
        column: 0 
      }),
      
      $(go.Panel, "Auto", //textfield
        {column: 2, alignment: go.Spot.Center,  minSize: new go.Size(50, NaN)},
        $(go.TextBlock, {editable: true, background: "white", stretch: go.GraphObject.Horizontal},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("editable", "isport", function(v) {return !v}),
          new go.Binding("visible", "connectedBlock", function(v) {return !v}),
          new go.Binding("background", "isport", function(v) {return v ? "lightgray" : "white"}),
        ),
      ),
      $(go.Panel, "Auto",
        { column: 2, alignment: go.Spot.Right},
        $(go.Shape, "Circle", portStyle(false),  // the rvalue port
          new go.Binding("portId", "portId"),
          { fill: "black", visible: false},
          new go.Binding("visible", "isport")
        )
      ),
      {
        click: (e, obj) => {
          onArgClick(e, obj, settingsAdornmentMap["DEFAULT ARGUMENT"]);
        }
      }
  ]
}