const operatorMap = {
    "+": "+",
    "-": "-",
    "x": "*",
    "÷": "/",
    ">": ">",
    ">=": ">=",
    "<": "<",
    "<=": "<=",
    "==": "=="
}

var refDeclaredVariables = { varsArguments : ["amogus", 1, 2] , key2 : ["amogus2", 2, 3]}

function generate(storeJSON) { // go to style and enable deletable==false
    console.log(storeJSON);
    const data = JSON.parse(storeJSON);
    
    const code = generateStatements(data, data.nodeDataArray[0], []) //nodeArray[0] represents main
    document.getElementById("generatedModel").value = code;
}

function generateStatements(ast, blocks, declaredVariables) {
    const lines = [];
    for(let statement of blocks.items) { // for every element in Block search and do statements
        linkedFun = findLinkedNode(ast, blocks.key, statement.portId)
        if(linkedFun) {
            const line = generateStatement(ast, linkedFun, declaredVariables);
            //console.log(tempDeclaredVariables.vars);
            lines.push(line);
        }
    }
    return lines.join("\n");
}

function generateStatement(ast, stmt, declaredVariables) { // recursive function, building the line statement
    if(stmt.type == "varsDecl") { //var i = 0
        var declarations = [];
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        });
        const variables = argumentsObj.items.map((arg) => {
            if(arg.variable) {
                declaredVariables.push(arg.variable);
                console.log(declaredVariables);
            }
            return arg.variable ? arg.variable : "";
        });

        for(var i = 0; i < variables.length; i++) {
            const declaration = arguments[i] ? variables[i] + " = " + arguments[i] : variables[i];
            declarations.push(declaration);
        }
        declarations = declarations.join(", ");
        return `var ${declarations};`;
    }
    else if(stmt.type == "print") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        }).join(" + ");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        });

        const condition = arguments[0];
        const if_part = arguments[1];
        const else_part = arguments[2];
        
        return (else_part == "") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1];

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {
        var argumentsObj = findLinkedNode(ast, stmt.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        });
        const initialize = arguments[0];
        const condition = arguments[1];
        const update = arguments[2];
        const contains = arguments[3];

        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        var localDeclaredVariables = declaredVariables.slice(0);
        const arguments = generateStatements(ast, stmt, localDeclaredVariables)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `{\n${arguments}\n}`
    } 
    else {
        const expr = generateExpression(ast, stmt, declaredVariables);
        return `${expr};`
    }
}

function generateExpression(ast, expr, declaredVariables) { // recursive function, building the expression
    
    if(expr.type == "operation") {
        var argumentsObj = findLinkedNode(ast, expr.key, null);
        const operator = operatorMap[expr.alias];
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        }).join(` ${operator} `);

        return `(${arguments})`
    } else if(expr.type == "varsRefer") { // i - i,a,b
        var argumentsObj = findLinkedNode(ast, expr.key, null);
        const arguments = argumentsObj.items.map((arg) => {
            return generateExpressionFromArgument(ast, arg, argumentsObj.key, declaredVariables)
        }).join(`, `);
        
        refDeclaredVariables[String(argumentsObj.key)] = declaredVariables;
        console.log(declaredVariables);
        console.log(argumentsObj.key);
        console.log(refDeclaredVariables[argumentsObj.key]);
        return `${arguments}`
    } else if(expr.type == "funBlocks") {
        const arguments = generateStatements(ast, expr, declaredVariables)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `${arguments}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateExpressionFromArgument(ast, arg, argumentskey, declaredVariables) {
    var localDeclaredVariables = declaredVariables.slice(0);
    if(arg.isport || arg.connectedBlock) {
        linkedFun = findLinkedNode(ast, argumentskey, arg.portId);
        return linkedFun ? generateExpression(ast, linkedFun, localDeclaredVariables) : "";
    }
    else {
        return arg.paramtext ? arg.paramtext : "";
    }
}

function generateExpressionFromVariable(arg) {
    if(arg.isExistingVar) {
        return arg.isExistingVar;
    }
    return arg.paramtext ? arg.paramtext : "";
}

function generateStatementFromArgument(ast, arg, argumentskey) {
    if(arg.isport) {
        linkedFun = findLinkedNode(ast, argumentskey, arg.portId);
        return linkedFun ? generateStatement(ast, linkedFun, declaredVariables) : "";
    }
    else {
        return arg.paramtext ? arg.paramtext : "";
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
