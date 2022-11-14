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
    var frame = { id : 0, maxId : 0};
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

function varDeclaration(stmt, stack, frame)  {
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
            if(!changedFrame) {
                changedFrame = true;
            }
        }
    }
    declarations = declarations.join(", ");
    return `var ${declarations};`;
}

function generateStatement(stmt, stack, frame) { // recursive function, building the line statement
    if(stmt.type == "varsDecl") { //var i = 0
        return varDeclaration(stmt, stack, frame)
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
        let subset = stmt.items.slice(1,4);
        
        const arguments = subset.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        });
        
        const initialize = generateExpressionFromArgument(stmt.items[0], stack, frame) ? 
            generateExpressionFromArgument(stmt.items[0], stack, frame) : generateExpressionFromArgument(stmt.items[0], stack, frame) + ";";
        const condition = arguments[0];
        const update = arguments[1];
        const contains = arguments[2];

        console.log(`${initialize}`);
        return `for ( ${initialize} ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        const tempStack =JSON.parse(JSON.stringify(stack));
        const tempFrameId = frame.id;
        const tempChangedFrame = changedFrame;
        changedFrame = false;
        const arguments = indent(generateStatements(stmt.items, tempStack, frame));
        frame.id = tempFrameId;
        changedFrame = tempChangedFrame;
        return `{\n${arguments}\n}`
    }
    else if((stmt.type == "break") || (stmt.type == "continue")) {
        return `${stmt.type};`
    }
    else {
        const expr = generateExpression(stmt, stack, frame);
        return `${expr};`
    }
}

function generateExpression(expr, stack, frame) { // recursive function, building the expression
    if(!expr) return ""; //what is this??
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
        }).join(` = `); //only final argument has real value

        arguments.forEach(function (item, index) {
            if(index != arguments.length) {
                setVariable(stack, item, arguments[arguments.length - 1]);
                if(!changedFrame) {
                    changedFrame = true;
                }
            }
        })

        return `${arguments}`
    }
    else if(expr.type == "varsRefer") { // i - i,a,b
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame)
        }).join(`, `);

        if(changedFrame) {
            frame.maxId++;
            const frameMaxId = frame.maxId;
            frame.id = frameMaxId;
        }
        getVariable(stack, frame, expr.key);
        return `${arguments}`
    }
    else if(expr.type == "getElem") {
        const arguments = expr.items.map((arg, index) => { //take cases if number or string, if number no quotes
            const getElemIndex = generateExpressionFromArgument(arg, stack, frame)
            return index ? `[${getElemIndex}]` : getElemIndex;
        }).join('');

        if(changedFrame) {
            frame.maxId++;
            const frameMaxId = frame.maxId;
            frame.id = frameMaxId;
        }
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
            entry = `"${variables[i]}"` + " : " + (arguments[i] ? arguments[i] : 0); //case where there is only value //create error when no argument
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
        if(arg.portId=="initialize" && arg.argument.type == "varsDecl") {
            console.log(arg.argument);
            return varDeclaration(arg.argument, stack, frame);
        }
        return generateExpression(arg.argument, stack, frame);
    }
    else {
        return arg.paramtext ? ( ((typeof arg.paramtext == 'number') || (arg.portId == "obj") || (arg.portId == "var")) ? `${arg.paramtext}` : `"${arg.paramtext}"`) : "";
    }
}