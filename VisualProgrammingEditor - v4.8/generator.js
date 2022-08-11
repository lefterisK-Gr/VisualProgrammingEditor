
function generate(storeJSON) {
    console.log(storeJSON);
    const data = JSON.parse(storeJSON);
    
    const expr = generateExpression(data, data.nodeDataArray[0], null);
    document.getElementById("generatedModel").value = expr;
}

function generateExpression(ast, expr, argumentskey) { // recursive function, building the expressions
    if(expr.type == "argument") {
        if(expr.isportactive) {
            linkedFun = findFunction(ast, expr.portId, argumentskey);
            console.log(linkedFun);
            return generateExpression(ast, linkedFun, null);
        }
        else if(expr.istextactive) {
            return expr.paramtext;
        }
    }
    else if(expr.type == "addition") {
        var argumentsObj = findArguments(ast, expr.key);
        console.log(argumentsObj.items);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpression(ast, arg, argumentsObj.key)
        }).join(" + ");

        return `(${arguments})`
    }
}

function findArguments(data, funkey) { //return an array of all arguments
    var i = 0;
    var j = 0;

    while(data.linkDataArray[i]) {
        if(data.linkDataArray[i].from == funkey)
        {
            argskey = data.linkDataArray[i].to;
            while(data.nodeDataArray[j]) {
                if(data.nodeDataArray[j].key == argskey)
                {
                    //console.log(data.nodeDataArray[j]);
                    return data.nodeDataArray[j];
                }
                j++;
            } 
        }
        i++;
    }
}

function findFunction(data, argport, argskey) {
    var i = 0;
    var j = 0;
    var funkey = null;

    while(data.linkDataArray[i]) { //need to specify from which arguments node (parent property)
        if(data.linkDataArray[i].from == argskey) {
            if(data.linkDataArray[i].fromPort == argport) {
                funkey = data.linkDataArray[i].to;
                while(data.nodeDataArray[j]) {
                    if(data.nodeDataArray[j].key == funkey){
                        return data.nodeDataArray[j];
                    }
                    j++;
                }
            }
        }
        i++;
    }
}
