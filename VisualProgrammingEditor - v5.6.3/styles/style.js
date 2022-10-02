
// define some common property settings
function selectionStyle() {
    return [new go.Binding("isShadowed", "isSelected").ofObject(),
    {
      selectionAdorned: false,
      shadowOffset: new go.Point(0, 0),
      shadowBlur: 15,
      shadowColor: "blue",
    }];
  }

  function textStyle() {
    return {
      font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
      stroke: "#000000"
    }
  }

  function portStyle(input) {
    return {
      desiredSize: new go.Size(20, 20),
      fill: "White",
      strokeWidth: 0,
      fromSpot: go.Spot.Right, //no need for this, tree layout makes that for nodes automatically
      fromLinkable: !input,
      toSpot: go.Spot.Left,
      toLinkable: input,
      toMaxLinks: 1,
      fromMaxLinks: 1,
      cursor: "pointer"
    };
  }

  