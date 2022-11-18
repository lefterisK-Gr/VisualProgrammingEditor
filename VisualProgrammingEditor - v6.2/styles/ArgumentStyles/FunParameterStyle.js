function parametersStyle() {
  return [
  new go.Binding("visible", "key", function(v, node) {
    if(myDiagram.findNodeForKey(v)) {
      return true
    }
    return false;
  }).ofObject(),
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  selectionStyle(), 
  $(go.Panel, "Spot",
    $(go.Panel, "Vertical", {name: "ARGS"},
        new go.Binding("itemArray", "items"),
        new go.Binding("itemTemplate", "type", function(v) {
          return funParamTemplate;
        })
    ),
    signsButton(false),
    //funParamCode
  )
  ]
}