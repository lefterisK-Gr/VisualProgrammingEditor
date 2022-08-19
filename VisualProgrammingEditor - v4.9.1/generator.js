
function generate(storeJSON) { // go to style and enable deletable==false
    console.log(storeJSON);
    const data = JSON.parse(storeJSON);
    
    const code = generateStatements(data, data.nodeDataArray[0]) //nodeArray[0] represents main
    console.log(code);
    document.getElementById("generatedModel").value = code;
}

function generateStatements(ast, blocks) {
    const lines = [];
    for(let statement of blocks.items) { // for every element in Block search and do statements
        linkedFun = findLinkedNode(ast, blocks.key, statement.portId)
        console.log(linkedFun);
        if(linkedFun) {
            const line = generateStatement(ast, linkedFun);
            lines.push(line);
        }
    }
    return lines.join("\n");
}

function generateStatement(ast, stmt) { // all statements must end with semicolomn or brackets
    if(stmt.type == "blocks") {
        const arguments = generateStatements(ast, stmt)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `{\n${arguments}\n}`
    } else if (stmt.type == "while") {
        const expr = generateExpression(ast, stmt);
        return `${expr}`;
    }
    else {
        const expr = generateExpression(ast, stmt);
        return `${expr};`;
    }
}

function generateExpression(ast, expr) { // recursive function, building the expression
    if(expr.type == "operation") {
        var argumentsObj = findLinkedNode(ast, expr.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        }).join(` ${expr.alias} `);

        return `(${arguments})`
    } else if(expr.type == "vars") { // var reference
        var argumentsObj = findLinkedNode(ast, expr.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        }).join("; ");
    } else if(expr.type == "while") {
        var argumentsObj = findLinkedNode(ast, expr.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        });

        return `while (${arguments[0] ? arguments[0] : ""}) {\n ${arguments[1] ? arguments[1] : ""} \n}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateFromArgument(ast, arg, argumentskey) {
    if(arg.isportactive) {
        linkedFun = findLinkedNode(ast, argumentskey, arg.portId);
        return linkedFun ? generateExpression(ast, linkedFun) : null;
    }
    else {
        return arg.paramtext;
    }
}

function findLinkedNode(ast, fromkey, argport) {
    var i = 0;
    var tokey = null;

    while(ast.linkDataArray[i]) {
        if(ast.linkDataArray[i].from == fromkey) {
            if(argport) {
                if(ast.linkDataArray[i].fromPort == argport) {
                    tokey = ast.linkDataArray[i].to;
                }
            }
            else {
                tokey = ast.linkDataArray[i].to;
            }
        }
        i++;
    }
    i = 0;
    while(ast.nodeDataArray[i]) {
        if(ast.nodeDataArray[i].key == tokey) {
            return ast.nodeDataArray[i];
        }
        i++;
    }
}
