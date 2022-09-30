
// save a model to and load a model from JSON text, displayed below the Diagram
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;

    generate(document.getElementById("mySavedModel").value);

    console.log(document.getElementById("generatedModel").value);
    //let result = eval(document.getElementById("generatedModel").value );
    //console.log(result); //here is printed undefined because we need one more variable in eval
    resultStore = true;
    //eval(document.getElementById("generatedModel").value);
    resultStore = false;
    //console.log(resultLines);
    //document.getElementById("resultModel").value = resultLines.join("\n");
    //resultLines.length = 0;
    
  }

  function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  }