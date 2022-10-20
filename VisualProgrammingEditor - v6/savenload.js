
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

function save() {

    myDiagram.isModified = false;

    savedModel = myDiagram.model.toJson();// gojs only accepted way of storing model
    const astModel = parse(savedModel);

    document.getElementById("mySavedModel").value = JSON.stringify(astModel, null, 2);

    console.log(JSON.stringify(astModel));
    generate(astModel);
    
    //generate(astModel);

    //let result = eval(document.getElementById("generatedModel").value );
    //console.log(result); //here is printed undefined because we need one more variable in eval
    resultStore = true;
    //--eval(document.getElementById("generatedModel").value);
    resultStore = false;
    //--console.log(resultLines);
    //--document.getElementById("resultModel").value = resultLines.join("\n");
    //--resultLines.length = 0;

    const tempVarName = "var"; //remove this

    myDiagram.nodes.each(function(n) {
      if(n.data.type == tempVarName) {
        n.updateTargetBindings("choices");
      }
    });
  }

  function load() {
    myDiagram.model = go.Model.fromJson(savedModel);
  }

  function generateCode() {
    
  }

  function execute() {
    
  }

  function layout() {
    myDiagram.layoutDiagram(true);
  }