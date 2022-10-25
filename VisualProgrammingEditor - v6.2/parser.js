function parse(storeJSON) {
    const data = JSON.parse(storeJSON);

    const ast = createAST(data.nodeDataArray, data.linkDataArray);

    return ast;
}

function createAST(nodes, links) {
    const myNodeMap = new Map(nodes.map((node) => [node.key, node]));
    const myLinkMap = new Map(links.map((link) => [link.to, link]));
    const tree = [];
    
    for (let i = 0; i < nodes.length; i += 1) { //reverse items and arguments
        const item = nodes[i];
        if(item.items) {
            item.items.forEach( function(v) {
                if(v.paramtext) {
                    value = parseInt(v.paramtext, 10);
                    if(!isNaN(value)){
                        v.paramtext = value;
                    }
                    else if(v.paramtext == "true") {
                        v.paramtext = true;
                    }
                    else if(v.paramtext == "false") {
                        v.paramtext = false;
                    }
                }
            })
        }
        
        const linkItem = myLinkMap.get(item.key);

        if(linkItem) { //has parent
            const parentItem = myNodeMap.get(linkItem.from);

            if(parentItem) {
                if (linkItem.category == "Reversed") {
                    parentItem.items = [];
                    parentItem.items = item.items;
                }
                else {
                    var index = parentItem.items.map(function(e) { return e.portId}).indexOf(linkItem.fromPort)
                    console.log(item);
                    parentItem.items[index].argument = item; 
                    console.log(parentItem.items[index])
                }
            }
        }
        else {
            tree.push(item);
        }
    }
    
    return tree;
}