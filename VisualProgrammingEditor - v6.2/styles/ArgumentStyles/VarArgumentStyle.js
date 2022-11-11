function varArgsStyle() {
  return [
  selectionStyle(), 
  $(go.Panel, "Vertical", {name: "ARGS"},
      new go.Binding("itemArray", "items"),
      {itemTemplate: varArgTemplate}
  )
  ]
}

function varArgStyle() {
  return [
    new go.Binding("visible", "key", function(v, node) {
      if(myDiagram.findNodeForKey(v)) {
        return true
      }
      return false;
    }).ofObject(),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, { fill: argFixedColor }),
    selectableArgStyle("Var"),
    {
      click: (e, obj) => {
        onArgClick(e, obj, settingsAdornmentMap["VAR ARGUMENT"]);
      }
    }
  ]
  }