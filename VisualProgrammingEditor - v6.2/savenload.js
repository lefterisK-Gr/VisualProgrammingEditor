
// save a model to and load a model from JSON text, displayed below the Diagram
var savedModel = { 
  "class": "go.GraphLinksModel",
  "nodeCategoryProperty": "type",
  "copiesArrays": true,
  "copiesArrayObjects": true,
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [
    {"key": "main" , "type": "mainBlock","items":[{"portId":"1"},{"portId":"2"}] }
  ],
  "linkDataArray": [
  ]
};

var astModel;
var tempAstModel;

  function save() {

    myDiagram.isModified = false;

    savedModel = myDiagram.model.toJson();// gojs only accepted way of storing model
    console.log(savedModel);
    astModel = parse(savedModel);
    
    document.getElementById("mySavedModel").value = JSON.stringify(astModel, null, 2);

    generateCode();

    myDiagram.nodes.each(function(n) {
      if(n.data.type == "var") {
        n.updateTargetBindings("choices");
      }
    });

  }

  function load() {
    myDiagram.model = go.Model.fromJson(savedModel);
  }

  function generateCode() {
    document.getElementById("generatedModel").value = generate(astModel);
  }

  function execute() {
      /*let result = eval(document.getElementById("generatedModel").value );
      resultStore = true;
      eval(document.getElementById("generatedModel").value);
      resultStore = false;
      document.getElementById("resultModel").value = resultLines.join("\n");
      resultLines.length = 0;*/
  }

  function updateDecls() {
    tempAstModel = parse(myDiagram.model.toJson());
    generate(tempAstModel); //upadte declared variables
  }

  function updateVar(n) {
    if(n.data.type == "varsRefer" || n.data.type == "getElem") {
      let outlink = n.findLinksOutOf(); // find argument
      let arg = myDiagram.findNodeForKey(outlink.first().data.to)
      arg.updateTargetBindings("choices");
    }
  }

  function updateVars() {
    myDiagram.nodes.each(function(n) {
      if (n.data && (n.data.type == "var" || n.data.type == "propertyAccesors") ) { n.updateTargetBindings("choices") }
    });
  }

  function updateCall(n) {
    if(n.data && (n.data.type == "call") ) {
      n.updateTargetBindings(); //cant update with name but on var i can
    }
  }

  function updateCalls() {
    myDiagram.nodes.each(function(n) {
      updateCall(n)
    });
  }
  const argsArray = ["args", "decl", "parameters", "propertyAccesors", "var"];
  const statementArray = ["function", "varsDecl", "print", "if", "while", "for", "blocks", "break", "continue", "return"];

  function isNodeArg(n, andBit) {
    for(let i = 0; i < argsArray.length; i++){
      if(argsArray[i] == n) {
        return !andBit}
    }
    return andBit;
  }

  function isNodeFunction(n, andBit) {
    for(let i = 0; i < statementArray.length; i++){
      if(statementArray[i] == n) {
        return !andBit
      }
    }
    return andBit;
  }

  function isNodeFunBlock(n) {
    console.log("ok")
    return n == "funBlocks"
  }

  function errorChecking(link) {
    const n = myDiagram.findNodeForKey(link.data.from)
    const m = myDiagram.findNodeForKey(link.data.to)
    if(isNodeArg(n.data.type, false)
      && isNodeFunction(m.data.type, false)) {
        const inLinks = n.findLinksInto().first();
        const parentN = myDiagram.findNodeForKey(inLinks.data.from)
        myDiagram.model.setDataProperty(parentN.data, "hasError", 1)
    }
  }

  function layout() {
    myDiagram.layoutDiagram(true);
  }