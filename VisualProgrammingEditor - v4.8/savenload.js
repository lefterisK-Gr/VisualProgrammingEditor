
// save a model to and load a model from JSON text, displayed below the Diagram
function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;

    generate(document.getElementById("mySavedModel").value);
  }

  function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
  }