
    var whitegrad = $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" });
    var darkbluegrad = $(go.Brush, "Linear", { 0: "#0217d6", 1: "#03108a" });

    var blocksTemplate = $(go.Node,"Spot", blockStyle(false));
    var mainBlockTemplate = $(go.Node, "Spot", blockStyle(true));  


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