function parse(storeJSON) {
    const data = JSON.parse(storeJSON);

    const ast = createAST(data.nodeDataArray, data.linkDataArray);
}

function createAST(nodes, links) {
    const myNodeMap = new Map(nodes.map((node) => [node.key, node]));
    const myLinkMap = new Map(links.map((link) => [link.to, link]));
    const tree = [];
    
    for (let i = 0; i < nodes.length; i += 1) { //reverse items and arguments
        const item = nodes[i];

        const linkItem = myLinkMap.get(item.key);

        if(linkItem) { //has parent
            const parentItem = myNodeMap.get(linkItem.from);

            if(parentItem) {
                console.log(parentItem);
                if (linkItem.category == "Reversed") {
                    parentItem.items = [];
                    parentItem.items = item.items;
                }
                else {
                    var index = parentItem.items.map(function(e) { return e.portId}).indexOf(linkItem.fromPort)
                    parentItem.items[index].argument = [];
                    parentItem.items[index].argument.push(item); 
                }
            }
        }
        else {
            tree.push(item);
        }
    }
    
    console.log(myNodeMap);
    console.log(myLinkMap);
    console.log(JSON.stringify(tree));
}