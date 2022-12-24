
    var whitegrad = $(go.Brush, "Linear", { 0: "#F0F8FF", 1: "#E6E6FA" });
    var darkbluegrad = $(go.Brush, "Linear", { 0: "#0217d6", 1: "#03108a" });
    var cyangrad = $(go.Brush, "Linear", { 0: "#99FFCC", 1: "#CCFFE5" });

    const block = {
      main: 0,
      stmt: 1,
      function_arg: 2
    }

    var blocksTemplate = $(go.Node,"Spot", blockStyle(block.stmt));
    var mainBlockTemplate = $(go.Node, "Spot", blockStyle(block.main));  
    var funBlocksTemplate = $(go.Node,"Spot", blockStyle(block.function_arg));

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

    function addTopBlock(block) {
      addBlock(block)
      myDiagram.startTransaction("add top block");
      if (!(block instanceof go.Node)) return;
      const outLink = block.findLinksOutOf();
      const totalLinks = outLink.count;
      console.log(outLink.count)
      var linkIterator = outLink.iterator;
      let i = 0;
      while(linkIterator.first()) {
        if( i == totalLinks) break;
        var i_link = linkIterator.value;
        console.log(i_link.data)
        // myDiagram.model.set(i_link.data, "fromPort", (Number(i_link.data.fromPort) + 1))
        // myDiagram.model.setFromPortIdForLinkData(i_link.data, (Number(i_link.data.fromPort) + 1) )
        var linkdata = {fromPort: (Number(i_link.data.fromPort) + 1).toString(), toPort: "in", "category":"BlockToNode"};
        linkdata[myDiagram.model.linkFromKeyProperty] = i_link.data.from;
        linkdata[myDiagram.model.linkToKeyProperty] = i_link.data.to;
        myDiagram.remove(i_link)
        myDiagram.model.addLinkData(linkdata)
        i++;
      }

      myDiagram.commitTransaction("add top block");
    }

    function removeTopBlock(block) {
      myDiagram.startTransaction("remove top block");
      if (!(block instanceof go.Node)) return;
      const outLink = block.findLinksOutOf();
      const totalLinks = outLink.count;
      console.log(outLink.count);
      var linkIterator = outLink.iterator;
      let i = 0;
      while(linkIterator.first()) {
        if( i == totalLinks) break;
        var i_link = linkIterator.value;
        console.log(i_link.data)
        if(Number(i_link.data.fromPort) > 1) {
          var linkdata = {fromPort: (Number(i_link.data.fromPort) - 1).toString(), toPort: "in", "category":"BlockToNode"};
          linkdata[myDiagram.model.linkFromKeyProperty] = i_link.data.from;
          linkdata[myDiagram.model.linkToKeyProperty] = i_link.data.to;
          myDiagram.model.addLinkData(linkdata)
        }
        myDiagram.remove(i_link)
        i++;
      }

      myDiagram.commitTransaction("remove top block");
      removeBlock(block);
    }