function getElemArgStyle() {
  return [
      {background: "transparent"},
      new go.Binding("background", "itemIndex", function(v, shape) {
          if(!shape.data.isport && !shape.data.paramtext && !shape.data.connectedBlock) {
            return "#fc554c"
          }
          else if( shape.part.data.arity && shape.part.data.arity.from && v < shape.part.data.arity.from){
            return argFixedColor;
          }
          return argDefaultColor;
      }).ofObject(),
      $(go.TextBlock, //portId lport
        {column: 0, width: 30 }, //width less than 40 cause of margin
        {margin: new go.Margin(2, 5, 2, 5)},
        new go.Binding("text", "portId")
      ),
      $(go.Panel, "Auto",
        {row: 0, column: 1, alignment: go.Spot.Right},
        $(go.Shape, "Circle", portStyle(false),  // the rvalue port
          new go.Binding("portId", "portId"),
          { fill: "black", visible: false},
          new go.Binding("visible", "isport")
        )
      ),
      $(go.Shape, "TriangleRight", {
        desiredSize: new go.Size(10, 10), 
        fill: "white", 
        stroke: null, 
        fill: null, 
        column: 0 
      }),
      $(go.Panel, "Auto", //textfield
        {row:0, column: 1, alignment: go.Spot.Center},
        $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("visible", "isport", function(v) {return !v})
        ),
      ),
      selectableArgStyle("Key"),

    {
      click: (e, obj) => {
        onArgClick(e, obj, settingsAdornmentMap["GET ELEMENT ARGUMENT"]);
      }
    }
  ]
}