function commentStyle(){
  return [
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("visible"),
    selectionStyle(), 

    { background: "lightyellow"},  // which can be accomplished by setting the background.
    $(go.TextBlock,
      { stroke: "brown", margin: 3, editable: true, width: 90 },
      new go.Binding("text")),
    ]
  }