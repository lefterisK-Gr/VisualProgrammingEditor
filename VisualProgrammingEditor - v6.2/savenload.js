
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
    astModel = parse(savedModel);

    document.getElementById("mySavedModel").value = JSON.stringify(astModel, null, 2);

    generateCode();

    myDiagram.nodes.each(function(n) {
      if(n.data.type == "var") {
        n.updateTargetBindings("choices");
      }
    });

    console.log( savedModel)
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
    console.log(stackFrames);
  }

  function updateVar(n) {
    if(n.data.type == "varsRefer" || n.data.type == "getElem") {
      let outlink = n.findLinksOutOf(); // find argument
      let arg = myDiagram.findNodeForKey(outlink.first().data.to)
      arg.updateTargetBindings("choices");
    }
  }

  function updateVars() {
    if(n.data.type == "varsDecl") {
      myDiagram.nodes.each(function(n) {
        console.log(n.data);
        if (n.data && (n.data.type == "var" || n.data.type == "obj") ) { n.updateTargetBindings("choices") }
      });
    }
  }

  function layout() {
    myDiagram.layoutDiagram(true);
  }