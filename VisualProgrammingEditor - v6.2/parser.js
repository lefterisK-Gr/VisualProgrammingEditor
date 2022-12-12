function parse(storeJSON) {
    const data = JSON.parse(storeJSON);

    const ast = createAST(data.nodeDataArray, data.linkDataArray);

    return ast;
}

function createAST(nodes, links) {
    const myNodeMap = new Map(nodes.map((node) => [node.key, node]));
    const myLinkMap = new Map();

    for(i =0; i < links.length; i++) {
        if(myLinkMap.has(links[i].to)) {
          myLinkMap.get(links[i].to).push(links[i]);
          continue;
        }
        myLinkMap.set(links[i].to, [links[i]]);
    }

    const tree = [];
    console.log(myLinkMap)
    for (let i = 0; i < nodes.length; i += 1) { //reverse items and arguments
        const item = nodes[i];
        delete item.breakpoint;

        console.log(item)

        if(item.items) {
            item.items.forEach( function(v) {
                delete v.isport;
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

        if(linkItem) {
            for(j=0 ; j < linkItem.length; j++) {
                const parentItem = myNodeMap.get(linkItem[j].from);
                console.log(parentItem)
                if(parentItem) {
                    if (linkItem[j].category == "Reversed") {
                        parentItem.items = [];
                        parentItem.items = item.items;
                    }
                    else {
                        if(linkItem[j].fromPort == "( )") {
                            parentItem.items.push({portId: "( )", connectedBlock: true})
                        }
                        var index = parentItem.items.map(function(e) { return e.portId}).indexOf(linkItem[j].fromPort)
                        if(item.type == "decl") {
                            parentItem.items[index].argument = convertItemToVarRef(item, linkItem[j]);
                        }
                        else {
                            parentItem.items[index].argument = item; 
                        }
                    }
                }
            }
        }
        else {
            tree.push(item);
        }
    }
    
    return tree;
}

function convertItemToVarRef(item, link) {
    item.type = "varsRefer";

    console.log(item)
    const node = myDiagram.findNodeForKey(item.key);
    var tableIndex = Number(link.toPort.replace("inSlot",'')) - 1

    const newParamText = item.items[tableIndex].variable;

    indexKey = 0;
    while(myDiagram.findNodeForKey(indexKey)) {
        indexKey++;
    }
    item.key = indexKey;

    item.items = [
        {
            "portId": "var",
            "paramtext": newParamText
        }
    ]

    return item;
}

function convertItemToGetElem(item, link) {
    
}