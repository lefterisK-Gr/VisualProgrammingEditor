
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
    //let result = eval(document.getElementById("generatedModel").value );
    //console.log(result); //here is printed undefined because we need one more variable in eval
    resultStore = true;
    //--eval(document.getElementById("generatedModel").value);
    resultStore = false;
    //--console.log(resultLines);
    //--document.getElementById("resultModel").value = resultLines.join("\n");
    //--resultLines.length = 0;

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
    
  }

  function updateDecls() {
    tempAstModel = parse(myDiagram.model.toJson());
    console.log(stackFrames);
    generate(tempAstModel); //upadte declared variables
  }

  function updateVar(n) {
    if(n.data.type == "varsRefer" || n.data.type == "getElem") {
      let outlink = n.findLinksOutOf(); // find argument
      let arg = myDiagram.findNodeForKey(outlink.first().data.to)
      arg.updateTargetBindings("choices");
    }
  }

  function layout() {
    myDiagram.layoutDiagram(true);
  }