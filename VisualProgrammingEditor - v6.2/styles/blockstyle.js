function nodeHoverAdornment() {
    return [$(go.Adornment, "Spot",
      {
        //background: "transparent",
        // hide the Adornment when the mouse leaves it
        mouseLeave: (e, obj) => {
          var ad = obj.part;
          ad.adornedPart.removeAdornment("mouseBlockHover");
        }
      },
      $(go.Placeholder,
        {
          //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
          isActionable: true,  // needed because this is in a temporary Layer
          click: (e, obj) => {
            var node = obj.part.adornedPart;
            node.diagram.select(node);
          }
        }),
      $("Button",
        { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right },
        { click: (e, obj) => alert("Hi!") },
        $(go.TextBlock, "Hi!")),
      $("Button",
        { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        { click: (e, obj) => alert("Bye") },
        $(go.TextBlock, "Bye"))
    )];
  }
function adornmentHover(e, obj) {
  var node = obj.part;
  console.log(node.data);
  nodeHoverAdornment.adornedObject = node;
  node.addAdornment("mouseBlockHover", nodeHoverAdornment);
}
function blockStyle(block_kind) {
    return [
        new go.Binding("visible", "key", function(v, node) {
          if(myDiagram.findNodeForKey(v) || !node.data.group) {
            return true
          }
          return false;
        }).ofObject(),
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        selectionStyle(), 
        {name: "blocks",
          deletable: (block_kind == block.stmt)
        },
        $(go.Panel, "Vertical",
          new go.Binding("itemArray","items"),
          {
            itemTemplate: 
              $(go.Panel,"Auto",
                $(go.Shape, "Rectangle", portStyle(false),  // the output port
                  new go.Binding("portId", "portId"),
                  {desiredSize: new go.Size(40, 40), strokeWidth: 2, fill: blockFill(block_kind)}
                ),
                $(go.TextBlock,
                  new go.Binding("text", "portId"),
                  {stroke: blockTextStroke(block_kind)}
                ),
                {
                  click: (e, obj) => {
                    adornmentHover(e, obj);
                  }
                }
              )
          }
        ),
        $(go.Shape, "TriangleRight", portStyle(true),
          {
            portId: "in",
            desiredSize: new go.Size(20, 20),
            fill: "black",
            stroke: "blue", strokeWidth: 3,
            alignment: go.Spot.TopLeft,
            visible: (block_kind != block.main)
          }
        ),
        $(go.Picture, "./images/hand.png", 
          {
            desiredSize: new go.Size(30, 30),
            alignment: go.Spot.Top, alignmentFocus: new go.Spot(0.5, 0.8)
          }
        ),
        $(go.Panel, "Horizontal", //add this to fun
          {alignment: go.Spot.Bottom},
          $("Button",
            $(go.Shape, "PlusLine", { width: 10, height: 10 }),
            {
              name: "BUTTON", 
              click: (e, button) => addBlock(button.part)
            },
          ),
          $("Button",
            $(go.Shape, "MinusLine", { width: 10, height: 10 }),
            { 
              name: "BUTTON2", 
              click: (e, button) => removeBlock(button.part)
            },
          )   
        ),
        $(go.Panel, "Vertical", //add this to fun
          {alignment: go.Spot.TopRight},
          $("Button",
            $(go.Shape, "PlusLine", { width: 10, height: 10 }),
            {
              name: "BUTTON3", 
              click: (e, button) => addTopBlock(button.part)
            },
          ),
          $("Button",
            $(go.Shape, "MinusLine", { width: 10, height: 10 }),
            { 
              name: "BUTTON4", 
              click: (e, button) => removeTopBlock(button.part)
            },
          )   
        )
    ]
  }

  function blockFill(block_kind) {
    if(!block_kind){
      return darkbluegrad;
    } else if (block_kind == block.stmt)
    {
      return whitegrad;
    }
    return cyangrad;
    
  }

  function blockTextStroke(block_kind) {
    if(!block_kind) {
      return "white";
    }
    return "black";
  }