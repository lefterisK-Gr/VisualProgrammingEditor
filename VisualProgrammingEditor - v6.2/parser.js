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
                if(parentItem) { // Built-In
                    if (linkItem[j].category == "Reversed") {
                        parentItem.items = [];
                        parentItem.items = item.items;
                    }
                    else { // Manulally linked
                        if(linkItem[j].fromPort == "( )") {
                            parentItem.items.push({portId: "( )", connectedBlock: true})
                        }
                        var index = parentItem.items.map(function(e) { return e.portId}).indexOf(linkItem[j].fromPort)
                        if(item.type == "decl") {
                            parentItem.items[index].argument = convertItemToRef(item, linkItem[j]);
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

function convertItemToRef(item, link) {

    var tableIndex = Number(link.toPort.replace("inSlot",'')) - 1; 

    const newParamText = item.items[tableIndex].variable; // get paramtext

    const functionNode = getParentNode(item); //get parent of decl node

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
        let inLinks = functionNode.findLinksInto(); // there is only one for function box
        setGetElem_Items(inLinks.first(), item);
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

        if(parentNode.data.type == "varsDecl" || parentNode.data.type == "object" ) { // dont forget assign
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

function setGetElem_Items(linkToParent, item) {
    var parentNode;
    var parentFunctionNode;
    var tableIndex = Number(linkToParent.data.fromPort) - 1; 

    parentNode = myDiagram.findNodeForKey(linkToParent.data.from) // get parent of functionNode (decl arguments)
    parentFunctionNode = getParentNode(parentNode); // get parent of parentNode ( Vars decl / Object )

    console.log(tableIndex);
    const newParamText = parentNode.data.items[tableIndex].variable; // get paramtext

    item.items.unshift({
        "paramtext": newParamText
    }) // set item to beginning of items array

    if(parentFunctionNode.data.type == "varsDecl") { return; }
    let inLinks = parentFunctionNode.findLinksInto(); // there is only one for function box
    setGetElem_Items(inLinks.first(), item)
}

function setGetElem_PortIds(item) {
    item.items[0].portId = "obj";
    let keyPrefix = "key"
    for(var i = 1; i < item.items.length; i++) {
        item.items[i].portId = keyPrefix + i;
    }
}

function convertItemToCall() {
    
}