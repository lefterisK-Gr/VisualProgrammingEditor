
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
        if(linkedFun) {
            const line = generateStatement(ast, linkedFun);
            lines.push(line);
        }
    }
    return lines.join("\n");
}

function generateStatement(ast, stmt) { // recursive function, building the line statement
    if(stmt.type == "vars") { //var declaration 
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        }).join(`, `);

        return `var ${arguments};`
    }
    else if(stmt.type == "print") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        }).join("");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        });
        const condition = arguments[0];
        const if_part = arguments[1].split("\n").map(line => "    " + line).join("\n");
        const else_part = arguments[2].split("\n").map(line => "    " + line).join("\n");
        console.log(else_part);
        return (else_part != "    ") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1].split("\n").map(line => "    " + line).join("\n");

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateFromArgument(ast, arg, argumentsObj.key)
        });
        const initialize = arguments[0];
        const condition = arguments[1];
        const update = arguments[2];
        const contains = arguments[3].split("\n").map(line => "    " + line).join("\n");

        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        const arguments = generateStatements(ast, stmt)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `{\n${arguments}\n}`
    } 
    else {
        const expr = generateExpression(ast, stmt);
        return `${expr};`
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
        }).join(`, `);

        return `${arguments}`
    }  else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateFromArgument(ast, arg, argumentskey) {
    if(arg.isportactive) {
        linkedFun = findLinkedNode(ast, argumentskey, arg.portId);
        return linkedFun ? generateStatement(ast, linkedFun) : null;
    }
    else if(arg.istextactive){
        return arg.paramtext;
    }
    else {
        return "";
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
