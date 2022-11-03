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
var changedFrame = false;

function setVariable(stack, variable, value) {
    stack[variable] = value ? value : null;
}

function getVariable(stack, frame, varKey) {
    changedFrame = false;
    let frameVars = JSON.parse(JSON.stringify(stack));
    if(stackFrames.length < (frame.id)) {
        stackFrames.push({refs: [], variables: frameVars});
    }
    const idIndex = stackFrames?.[frame.id-1]; //check if there is stackframe for frameId
    if(idIndex !== undefined && !stackFrames[frame.id-1].refs.includes(varKey)) {
        stackFrames[frame.id-1].refs.push(varKey);
    }
}

function generate(ast) { // go to style and enable deletable==false
    changedFrame = false;
    stackFrames = [];
    frame = { id : 0};
    return generateStatements(ast[0].items, {}, frame) //ast[0] represents main--is it ok to make assumption?
}

function generateStatements(statements, stack, frame) {
    const lines = [];
    for(let statement of statements) { 
        const line = statement.argument ? generateStatement(statement.argument, stack, frame) : "";
        lines.push(line);
    }
    return lines.join("\n");
}

function generateStatement(stmt, stack, frame) { // recursive function, building the line statement
    if(stmt.type == "varsDecl") { //var i = 0
        var declarations = [];
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });

        const variables = stmt.items.map((arg) => { 
            return arg.variable ? arg.variable : null; 
        }); 

        for(var i = 0; i < variables.length; i++) {
            const declaration = arguments[i] ? variables[i] + " = " + arguments[i] : variables[i]; //case where there is only value
            if(variables[i]) {
                declarations.push(declaration);
                setVariable(stack, variables[i], arguments[i]);
                if(!changedFrame) {changedFrame = true; frame.id++;}
            }
        }
        declarations = declarations.join(", ");
        return `var ${declarations};`;
    }
    else if(stmt.type == "print") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        }).join(" + ");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });

        const condition = arguments[0];
        const if_part = arguments[1];
        const else_part = arguments[2];
        
        return (else_part == "") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1];

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });
        const initialize = arguments[0];
        const condition = arguments[1];
        const update = arguments[2];
        const contains = arguments[3];

        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        const tempStack = stack.slice(0);
        const tempFrameId = frame.id;
        const arguments = indent(generateStatements(stmt.items, tempStack, tempFrameId));
        return `{\n${arguments}\n}`
    } 
    else {
        const expr = generateExpression(stmt, stack, frame);
        return `${expr};`
    }
}

function generateExpression(expr, stack, frame) { // recursive function, building the expression
    if(expr.type == "arithmeticOperator" || expr.type == "relationalOperator" || expr.type == "unaryOperator" || expr.type == "binaryOperator") {
        const operator = operatorTypeMap[expr.type][expr.alias];
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        }).join(` ${operator} `);

        return `(${arguments})`
    } 
    else if(expr.type == "assign") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        }).join(` = `);

        return `${arguments}`
    }
    else if(expr.type == "varsRefer") { // i - i,a,b
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        }).join(`, `);

        getVariable(stack, frame, expr.key);
        return `${arguments}`
    }
    else if(expr.type == "getElem") {
        const arguments = expr.items.map((arg, index) => { //take cases if number or string, if number no quotes
            const getElemIndex = generateExpressionFromArgument(arg, stack, frame)
            return index ? ( (typeof getElemIndex == 'number') ? `[${getElemIndex}]` : `["${getElemIndex}"]`) : getElemIndex;
        }).join('');

        getVariable(stack, frame, expr.key);
        return `${arguments}`;
    }
    else if(expr.type == "object") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });

        const variables = expr.items.map((arg) => {
            return arg.variable ? arg.variable : "";
        });

        var entries = [];

        for(var i = 0; i < variables.length; i++) {
            entry = `"${variables[i]}"` + " : " + arguments[i]; //case where there is only value //create error when no argument
            entries.push(entry);
        }
        entries = entries.join(",\n")
        entries = indent(entries);
        return `{\n${entries}\n}`;
    }
    else if(expr.type == "funBlocks") {
        const arguments = indent(generateStatements(expr.items, stack, frame));
        return `${arguments}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateExpressionFromArgument(arg, stack, frame) {
    if(arg.isport || arg.connectedBlock){ //there is no need for connectedBlock
        return generateExpression(arg.argument, stack, frame);
    }
    else {
        return arg.paramtext ? arg.paramtext : "";
    }
}