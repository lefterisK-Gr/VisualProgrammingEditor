function parse(storeJSON) {
    const data = JSON.parse(storeJSON);

    const ast = createAST(data.nodeDataArray);
}

function createAST(model) {
    var nodes = Object.create(null)
    r = {};
    model.forEach( function (a) {
        
    })
    console.log(r);
    console.log(model);
}