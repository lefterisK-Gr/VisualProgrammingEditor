const arithmOperatorMap = {
    "+": "+",
    "-": "-",
    "x": "*",
    "÷": "/"
}

const relationalOperatorMap = {
    ">": ">",
    ">=": ">=",
    "<": "<",
    "<=": "<=",
    "==": "=="
}

const unaryOperatorMap = {
    "!": "!",
    "++": "++",
    "--": "--",
}

const binaryOperatorMap = {
    "&&": "&&",
    "||": "||"
}

const operatorTypeMap = {
    "arithmeticOperator": arithmOperatorMap,
    "relationalOperator": relationalOperatorMap,
    "unaryOperator": unaryOperatorMap,
    "binaryOperator": binaryOperatorMap
}

function indent(str) {
    return str.split("\n").map(line => "    " + line).join("\n");
}

var stackFrames = []; //stackFrames happening with references

function setVariable(stack, variable, value) {
    stack[variable] = value ? value : null;
}

function getVariable(stack, id, varKey) {
    console.log("inside get");
    console.log(id);
    let frame = JSON.parse(JSON.stringify(stack));
    if(stackFrames.length < (id+1)) {
        stackFrames.push({refs: [], variables: frame});
    }
    const idIndex = stackFrames?.[id];
    if(idIndex !== undefined && !stackFrames[id].refs.includes(varKey)) {
        stackFrames[id].refs.push(varKey);
    }
}

function generate(ast) { // go to style and enable deletable==false
    console.log(stackFrames);
    stackFrames = [];
    frame = { id : 0};
    console.log(stackFrames);
    return generateStatements(ast[0].items, {}, frame) //ast[0] represents main--is it ok to make assumption?
}

function generateStatements(statements, stack, frame) {
    const lines = [];
    for(let statement of statements) { 
        const line = statement.argument ? generateStatement(statement.argument, stack, frame) : "";
        frameId = stackFrames.length;
        console.log(stackFrames.length);
        console.log(frameId);
        lines.push(line);
    }
    return lines.join("\n");
}

function generateStatement(stmt, stack, frameId) { // recursive function, building the line statement
    if(stmt.type == "varsDecl") { //var i = 0
        var declarations = [];
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        });

        const variables = stmt.items.map((arg) => { 
            return arg.variable ? arg.variable : null; 
        }); 

        for(var i = 0; i < variables.length; i++) {
            const declaration = arguments[i] ? variables[i] + " = " + arguments[i] : variables[i]; //case where there is only value
            if(variables[i]) {
                declarations.push(declaration);
                console.log(variables[i]);
                setVariable(stack, variables[i], arguments[i]);
            }
        }
        declarations = declarations.join(", ");
        return `var ${declarations};`;
    }
    else if(stmt.type == "print") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        }).join(" + ");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        });

        const condition = arguments[0];
        const if_part = arguments[1];
        const else_part = arguments[2];
        
        return (else_part == "") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1];

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        });
        const initialize = arguments[0];
        const condition = arguments[1];
        const update = arguments[2];
        const contains = arguments[3];

        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        const tempStack = stack.slice(0);
        const tempFrameId = frameId;
        const arguments = indent(generateStatements(stmt.items, tempStack, tempFrameId));
        return `{\n${arguments}\n}`
    } 
    else {
        const expr = generateExpression(stmt, stack, frameId);
        return `${expr};`
    }
}

function generateExpression(expr, stack, frameId) { // recursive function, building the expression
    if(expr.type == "arithmeticOperator" || expr.type == "relationalOperator" || expr.type == "unaryOperator" || expr.type == "binaryOperator") {
        const operator = operatorTypeMap[expr.type][expr.alias];
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        }).join(` ${operator} `);

        return `(${arguments})`
    } 
    else if(expr.type == "assign") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        }).join(` = `);

        return `${arguments}`
    }
    else if(expr.type == "varsRefer") { // i - i,a,b
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        }).join(`, `);

        getVariable(stack, frameId, expr.key);
        return `${arguments}`
    }
    else if(expr.type == "getElem") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        }).join(`.`);

        getVariable(stack, frameId, expr.key);
        return `${arguments}`;
    }
    else if(expr.type == "object") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frameId)
        });

        const variables = expr.items.map((arg) => {
            return arg.variable ? arg.variable : "";
        });

        var entries = [];

        for(var i = 0; i < variables.length; i++) {
            entry = variables[i] + " : " + arguments[i]; //case where there is only value
            entries.push(entry);
        }
        entries = entries.join(",\n")
        entries = indent(entries);
        return `{\n${entries}\n}`;
    }
    else if(expr.type == "funBlocks") {
        const arguments = indent(generateStatements(expr.items, stack, frameId));
        return `${arguments}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateExpressionFromArgument(arg, stack, frameId) {
    if(arg.isport || arg.connectedBlock){ //there is no need for connectedBlock
        return generateExpression(arg.argument, stack, frameId);
    }
    else {
        return arg.paramtext ? arg.paramtext : "";
    }
}