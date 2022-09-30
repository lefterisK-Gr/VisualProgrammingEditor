function blockStyle(block_kind) {
    return [
        selectionStyle(), 
        {name: "blocks",
          deletable: (block_kind == block.stmt)
        },
        $(go.Panel, "Vertical",
          new go.Binding("itemArray","items"),
          {
            itemTemplate: 
              $(go.Panel,"Auto",
                $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
                  new go.Binding("portId", "portId"),
                  {desiredSize: new go.Size(40, 40), strokeWidth: 2, fill: blockFill(block_kind)}
                ),
                $(go.TextBlock,{editable: true},
                  new go.Binding("text", "portId"),
                  {stroke: blockTextStroke(block_kind)}
                )          
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
        $(go.Shape, "Rectangle", 
          {
            desiredSize: new go.Size(20, 20),
            fill: "white",
            strokeWidth: 3,
            alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom
          }
        ),
        $(go.Panel, "Horizontal",
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