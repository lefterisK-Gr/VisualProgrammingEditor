
    var whitegrad = $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" });

    var blocksTemplate = 
      $(go.Node,"Spot", selectionStyle(), 
        {name: "blocks"},
        $(go.Panel, "Vertical",
          new go.Binding("itemArray","items"),
          {
            itemTemplate: 
              $(go.Panel,"Auto",
                $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
                  new go.Binding("portId", "portId"),
                  {desiredSize: new go.Size(40, 40), strokeWidth: 2, fill: whitegrad}
                ),
                $(go.TextBlock,{editable: true},
                  new go.Binding("text", "portId")
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
            alignment: go.Spot.TopLeft
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
      );
        
    function addBlock(block) {
      myDiagram.startTransaction("add block");
      if (!(block instanceof go.Node)) return;
      let i = 1;
      while (block.findPort( i.toString()) !== block) 
      {
        i++;
      }
      const name = i.toString();
      const arr = block.data.items;

      if (arr) {
        // create a new port data object
        const newportdata = {
          portId: name
        };
        // and add it to the end of Array of port data
        myDiagram.model.insertArrayItem(arr, -1, newportdata);
      }

      myDiagram.commitTransaction("add block");
    }

    function removeBlock(block) {
      if (!block) return;
      var arr = block.data.items;
      myDiagram.startTransaction("remove block");
      myDiagram.model.removeArrayItem(arr);
      myDiagram.commitTransaction("remove block");
    }