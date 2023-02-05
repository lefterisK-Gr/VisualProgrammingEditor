function varArgStyle() {
  return [
    {background: "transparent"},
    new go.Binding("background", "itemIndex", function(v, shape) {
        if(!shape.data.paramtext) {
          return "#fc554c"
        }
        return argDefaultColor;
    }).ofObject(),
    selectableArgStyle("Var"),
    $(go.Shape, "TriangleRight", {
      desiredSize: new go.Size(10, 10), 
      fill: "white", 
      stroke: null, 
      fill: null, 
      column: 0 
    }),
    {
      click: (e, obj) => {
        onArgClick(e, obj, settingsAdornmentMap["VAR ARGUMENT"]);
      }
    }
  ]
  }