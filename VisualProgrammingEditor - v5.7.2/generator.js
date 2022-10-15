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

var refDeclaredVariables = { }

function generate(ast) { // go to style and enable deletable==false
    const code = generateStatements(ast[0].items, []) //ast[0] represents main--is it ok to make assumption?
    document.getElementById("generatedModel").value = code;
}

function generateStatements(statements, declaredVariables) {
    const lines = [];
    for(let statement of statements) { 
        const line = statement.argument ? generateStatement(statement.argument[0], declaredVariables) : "";
        lines.push(line);
    }
    return lines.join("\n");
}

function generateStatement(stmt, declaredVariables) { // recursive function, building the line statement
    if(stmt.type == "varsDecl") { //var i = 0
        var declarations = [];
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        });
        const variables = stmt.items.map((arg) => {
            if(arg.variable) {
                declaredVariables.push(arg.variable);
            }
            return arg.variable ? arg.variable : "";
        });

        for(var i = 0; i < variables.length; i++) {
            const declaration = arguments[i] ? variables[i] + " = " + arguments[i] : variables[i]; //case where there is only value
            declarations.push(declaration);
        }
        declarations = declarations.join(", ");
        return `var ${declarations};`;
    }
    else if(stmt.type == "print") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        }).join(" + ");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        });

        const condition = arguments[0];
        const if_part = arguments[1];
        const else_part = arguments[2];
        
        return (else_part == "") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1];

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        });
        const initialize = arguments[0];
        const condition = arguments[1];
        const update = arguments[2];
        const contains = arguments[3];

        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        var localDeclaredVariables = declaredVariables.slice(0);
        const arguments = generateStatements(stmt.items, localDeclaredVariables)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `{\n${arguments}\n}`
    } 
    else {
        const expr = generateExpression(stmt, declaredVariables);
        return `${expr};`
    }
}

function generateExpression(expr, declaredVariables) { // recursive function, building the expression
    if(expr.type == "operator") {
        const operator = operatorMap[expr.alias];
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        }).join(` ${operator} `);

        return `(${arguments})`
    } 
    else if(expr.type == "varsRefer") { // i - i,a,b
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, declaredVariables)
        }).join(`, `);

        refDeclaredVariables[String(expr.key)] = declaredVariables;
        return `${arguments}`
    } 
    else if(expr.type == "funBlocks") {
        const arguments = generateStatements(expr.items, declaredVariables)
            .split("\n")
            .map(line => "    " + line)
            .join("\n");
        return `${arguments}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateExpressionFromArgument(arg, declaredVariables) {
    if(arg.isport || arg.connectedBlock){ //there is no need for connectedBlock
        return generateExpression(arg.argument[0], declaredVariables);
    }
    else {
        return arg.paramtext ? arg.paramtext : "";
    }
}