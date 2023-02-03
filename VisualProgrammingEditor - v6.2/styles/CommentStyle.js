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

function paramTextStyle(){
  return [
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, "Auto", 
    $(go.Shape, "RoundedRectangle", { fill: argDefaultColor }),
      $(go.TextBlock, {
        width: 80,
        height: 20, 
        text: "a Text Block", 
        background: "white",
        margin: 2, 
        textAlign: "center", 
        verticalAlignment: go.Spot.Center 
      },
      new go.Binding("text", "text")
      ),
    )
  ]
}