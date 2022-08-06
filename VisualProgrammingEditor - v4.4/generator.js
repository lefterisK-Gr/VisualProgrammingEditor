
function generate(storeJSON) {
    console.log(storeJSON);
    const data = JSON.parse(storeJSON);

    generateExpression(data);
    
}

function generateExpression(ast) {
    if(ast.nodeDataArray[0].key == "assignFunction") {
        document.getElementById("generatedModel").value = ast.nodeDataArray[1].items[0].portId + " = " + ast.nodeDataArray[1].items[1].portId;
    }
    console.log(ast.nodeDataArray[1].items)
}