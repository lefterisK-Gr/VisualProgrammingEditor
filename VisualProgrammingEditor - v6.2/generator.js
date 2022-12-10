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

var stackFrames = []; //stackFrames happening with references, has variables that are initiallized
var functionStackFrames = [];
var changedFrame = false;
var changedFunctionFrame = false;

function setVariable(stack, variable, value) {
    stack[variable] = value ? value : null;
}

function getVariable(stack, frame, varKey) {
    changedFrame = false;
    let frameVars = JSON.parse(JSON.stringify(stack));
    if(stackFrames.length < (frame.id)) { //check if its new frame
        stackFrames.push({refs: [], variables: frameVars});
    }
    const idIndex = stackFrames?.[frame.id-1]; //check if there is stackframe for frameId / check if its old frame 
    if( (idIndex !== undefined) && !stackFrames[frame.id-1].refs.includes(varKey) ) {
        stackFrames[frame.id-1].refs.push(varKey);
    }
    console.log(stackFrames);
}

function setFunctionName(functionFrame, functionName) { //add function name to functionStack
    if(functionStackFrames.length < (functionFrame.id)) { // deeper into blocks
        functionStackFrames.push({refs: [], functions: []});
    }
    const idIndex = functionStackFrames?.[functionFrame.id-1];
    if( (idIndex !== undefined) && !functionStackFrames[functionFrame.id-1].functions.includes(functionName) ) {
        functionStackFrames[functionFrame.id-1].functions.push(functionName);
    }
    console.log(functionStackFrames);
} //include warning message when declaring same function

function getFunctionName(functionFrame, callKey) { //when calling a function, for that key of the call(ref) push functionStack 
    if(functionStackFrames.length < (functionFrame.id)) { // deeper into blocks
        functionStackFrames.push({refs: [], functions: []});
    }
    const idIndex = functionStackFrames?.[functionFrame.id-1];
    if( (idIndex !== undefined) && !functionStackFrames[functionFrame.id-1].refs.includes(callKey) ) {
        functionStackFrames[functionFrame.id-1].refs.push(callKey);
    }
    console.log(functionStackFrames);
}

function generate(ast) { // go to style and enable deletable==false
    changedFrame = false;
    stackFrames = [];
    functionStackFrames = [];
    var frame = { id : 0, maxId : 0};
    var functionFrame = { id: 1, maxId: 1};
    return generateStatements(ast[0].items, {}, frame, functionFrame) //ast[0] represents main--is it ok to make assumption?
}

function generateStatements(statements, stack, frame, functionFrame) {
    const lines = [];
    for(let statement of statements) { 
        const line = statement.argument ? generateStatement(statement.argument, stack, frame, functionFrame) : "";
        lines.push(line);
    }
    return lines.join("\n");
}

function varDeclaration(stmtItems, stack, frame, functionFrame) {
    var declarations = [];
    const arguments = stmtItems.map((arg) => {
        return generateExpressionFromArgument(arg, stack, frame, functionFrame)
    });

    const variables = stmtItems.map((arg) => { 
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
    return declarations
}

function varDeclarationStmt(stmt, stack, frame, functionFrame)  {
    const stmtItems = stmt.items;
    var declarations = varDeclaration(stmtItems, stack, frame, functionFrame)
    return `var ${declarations};`;
}

function functionBoxGen(stmt, stack, frame, functionFrame) {
    const functionName = stmt.ident ? stmt.ident : "";

    setFunctionName(functionFrame, functionName);

    const tempStack =JSON.parse(JSON.stringify(stack));
    const tempFrameId = frame.id;
    const tempChangedFrame = changedFrame;
    changedFrame = false;

    if(functionStackFrames[functionFrame.maxId-1]?.functions.length) {
        functionFrame.maxId++;
    }
    const tempFunctionId = functionFrame.id;
    const funcionFrameMaxId = functionFrame.maxId;
    functionFrame.id = funcionFrameMaxId;

    const tempArgs = stmt.items.slice(0, stmt.items.length-1);
    var declarations = varDeclaration(tempArgs, tempStack, frame, functionFrame);

    const codeBlock = stmt.items[stmt.items.length - 1];
    const funCode = generateExpressionFromArgument(codeBlock, tempStack, frame, functionFrame);
    
    frame.id = tempFrameId;
    changedFrame = tempChangedFrame;
    functionFrame.id = tempFunctionId;

    return `function ${functionName}( ${declarations} ) {\n${funCode}\n}`;
}

function generateStatement(stmt, stack, frame, functionFrame) { // recursive function, building the line statement
    if(stmt.type == "function") {
        return functionBoxGen(stmt, stack, frame, functionFrame);
    }
    else if(stmt.type == "varsDecl") { //var i = 0
        return varDeclarationStmt(stmt, stack, frame, functionFrame);
    }
    else if(stmt.type == "print") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame);
        }).join(" + ");

        return `console.log( ${arguments} );`;
    }
    else if(stmt.type == "if") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        });

        const condition = arguments[0];
        const if_part = arguments[1];
        const else_part = arguments[2];
        
        return (else_part == "") ? `if (${condition}) {\n${if_part}\n}\nelse {\n${else_part}\n}` : `if (${condition}) {\n${if_part}\n}`;
    } 
    else if(stmt.type == "while") {
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        });
        const condition = arguments[0];
        const if_true_part = arguments[1];

        return `while (${condition}) {\n${if_true_part}\n}`;
    } 
    else if(stmt.type == "for") {    
        const arguments = stmt.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        });
        
        const initialize = arguments[0].replace(/\;$/, '');;
        const condition = arguments[1].replace(/\;$/, '');;
        const update = arguments[2].replace(/\;$/, '');;
        const contains = arguments[3].replace(/\;$/, '');;

        
        console.log(`${initialize}`);
        return `for ( ${initialize}; ${condition}; ${update} ) {\n${contains}\n}`;
    } 
    else if(stmt.type == "blocks") {
        const arguments = indent(generateStatements(stmt.items, stack, frame, functionFrame));

        return `{\n${arguments}\n}`
    }
    else if((stmt.type == "break") || (stmt.type == "continue")) {
        return `${stmt.type};`
    }
    else if(stmt.type == "return") {
        const argument = generateExpressionFromArgument(stmt.items[0], stack, frame, functionFrame);
        return `return ${argument};`;
    }
    else {
        const expr = generateExpression(stmt, stack, frame, functionFrame);
        return `${expr};`
    }
}

function generateExpression(expr, stack, frame, functionFrame) { // recursive function, building the expression
    if(!expr) return ""; //when having port but not connected
    else if(expr.type == "function") {
        return functionBoxGen(expr, stack, frame, functionFrame);
    }
    else if (expr.type == "call") {
        const functionName = expr.ident ? expr.ident : "";
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame);
        }).join(", ");

        getFunctionName(functionFrame, expr.key);
        return `${functionName}( ${arguments} )`;
    }
    else if(expr.type == "arithmeticOperator" || expr.type == "relationalOperator" || expr.type == "unaryOperator" || expr.type == "binaryOperator") {
        const operator = operatorTypeMap[expr.type][expr.alias];
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        }).join(` ${operator} `);

        return `(${arguments})`
    } 
    else if(expr.type == "assign") { 
        const variables = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        }); //only final argument has real value

        console.log(variables);
        variables.forEach(function (item, index) {
            if(index != variables.length && stack[item]) {
                console.log(item);
                setVariable(stack, item, variables[variables.length - 1]);
                if(!changedFrame) {
                    changedFrame = true;
                }
            }
        })

        const arguments = variables.join(` = `)
        return `${arguments}`
    }
    else if(expr.type == "varsRefer") { // i - i,a,b
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
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
            const getElemIndex = generateExpressionFromArgument(arg, stack, frame, functionFrame)
            return index ? `[${getElemIndex}]` : getElemIndex.replace(/(^"|"$)/g, '');
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
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
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
    else if(expr.type == "array") {
        const arguments = expr.items.map((arg) => {
            return generateExpressionFromArgument(arg, stack, frame, functionFrame)
        }).join(", ");

        return `[${arguments}]`
    }
    else if(expr.type == "funBlocks") {
        const arguments = indent(generateStatements(expr.items, stack, frame, functionFrame));
        return `${arguments}`
    }
    else {
        throw new Error(`Unhandled AST node type ${node.type}`)
    }
}

function generateExpressionFromArgument(arg, stack, frame, functionFrame) {
    if(arg.argument || arg.connectedBlock){ //there is no need for connectedBlock
        if(arg.portId=="initialize" && arg.argument.type == "varsDecl") {
            console.log(arg.argument);
            return varDeclarationStmt(arg.argument, stack, frame);
        }
        return generateExpression(arg.argument, stack, frame, functionFrame);
    }
    else {
        return arg.paramtext ? ( ((typeof arg.paramtext == 'number') || (arg.portId == "propertyAccesors") || (arg.portId == "var")) ? `${arg.paramtext}` : `"${arg.paramtext}"`) : "";
    }
}