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
            let cloneItem;
            let transformedDecl;
            for(j=0 ; j < linkItem.length; j++) {
                var parentItem = myNodeMap.get(linkItem[j].from);
                console.log(parentItem)
                if(parentItem) { 
                    if (linkItem[j].category == "Reversed") {// Built-In Link
                        parentItem.items = [];
                        parentItem.items = item.items;
                    }
                    else { // Manulally linked
                        if(linkItem[j].fromPort == "( )") {
                            parentItem.items.push({portId: "( )", connectedBlock: true})
                        }
                        var index = parentItem.items.map(function(e) { return e.portId}).indexOf(linkItem[j].fromPort)

                        if(item.type == "decl" || item.type == "args") {
                            cloneItem = JSON.parse(JSON.stringify(item))
                            transformedDecl = convertItemToRef(cloneItem, linkItem[j]);
                            parentItem.items[index].argument = transformedDecl;
                        }
                        else {// connection to functionbox
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

function convertItemToRef(item, link) {

    var tableIndex = Number(link.toPort.replace("inSlot",'')) - 1; 

    const functionNode = getParentNode(item); //get parent of decl node

    const newParamText = (item.type == "decl") ? item.items[tableIndex].variable : tableIndex; // get paramtext
    console.log(newParamText);
    item.key = getUniqueKey(); // set key

    if(functionNode.data.type == "varsDecl") {
        item.type = "varsRefer"; // set type
        item.items = [
            {
                "portId": "var",
                "paramtext": newParamText
            }
        ];
    }
    else {
        item.type = "getElem";
        item.items = [
            {
                "paramtext": newParamText
            }
        ];
        console.log(item.items)
        setGetElem_Items(item, functionNode);
        setGetElem_PortIds(item);
    }
    return item;
}

function getParentNode(item) {
    var parentNode;
    const node = myDiagram.findNodeForKey(item.key); //get node instead of data

    const inLinks = node.findLinksInto();

    var linkIterator = inLinks.iterator;

    while(linkIterator.next()) {
        var i_item = linkIterator.value;
        parentNode = myDiagram.findNodeForKey(i_item.data.from)

        if(parentNode.data.type == "varsDecl" || parentNode.data.type == "object" || parentNode.data.type == "array") { // dont forget assign and array
            break;
        }
    }

    return parentNode;
}

function getUniqueKey() {
    let indexKey = 0;
    while(myDiagram.findNodeForKey(indexKey)) {
        indexKey++;
    }
    return indexKey;
}

function setGetElem_Items(item, functionItem) {
    let linkToParentItem = functionItem.findLinksInto().first(); // there is only one for function box

    var parentNode;
    var parentFunctionNode;

    var tableIndex = Number(linkToParentItem.data.fromPort) - 1; // it is always a number for decls
    parentNode = myDiagram.findNodeForKey(linkToParentItem.data.from) // get parent of functionNode (decl arguments)
    parentFunctionNode = getParentNode(parentNode); // get parent of parentNode ( Vars decl / Object )

    const newParamText = (parentNode.data.type == "decl") ? parentNode.data.items[tableIndex].variable : tableIndex;
    item.items.unshift({
        "paramtext": newParamText
    }) // set item to beginning of items array

    if(parentFunctionNode.data.type == "varsDecl") { return; }

    setGetElem_Items(item, parentFunctionNode)
}

function setGetElem_PortIds(item) {
    item.items[0].portId = "obj";
    let keyPrefix = "key"
    for(var i = 1; i < item.items.length; i++) {
        item.items[i].portId = keyPrefix + i;
    }
}