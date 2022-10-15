
// save a model to and load a model from JSON text, displayed below the Diagram
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;

    savedModel = document.getElementById("mySavedModel").value
    console.log(savedModel);
    const astModel = parse(savedModel);
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
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  }

  function layout() {
    myDiagram.layoutDiagram(true);
  }