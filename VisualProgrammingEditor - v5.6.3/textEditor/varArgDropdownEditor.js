"use strict";

(function(window) {
  var varEditor = new go.HTMLInfo();

  var customSelectBox = document.createElement("select");

  varEditor.show = function(textBlock, diagram, tool) {
    if (!(textBlock instanceof go.TextBlock)) return;

    // Populate the select box:
    customSelectBox.innerHTML = "";

    var list = textBlock.choices;
    // Perhaps give some default choices if textBlock.choices is null
    if (list === null) list = ["Default A", "Default B", "Default C"];
    var l = list.length;
    for (var i = 0; i < l; i++) {
      var op = document.createElement("option");
      op.text = list[i];
      op.value = list[i];
      if (list[i] === textBlock.text) op.selected = true;
      customSelectBox.add(op, null);

      // consider also adding the current value, if it is not in the choices list
    }

    // After the list is populated, set the value:
    customSelectBox.value = textBlock.text;

    customSelectBox.addEventListener("change", function(e) { 
      tool.acceptText(go.TextEditingTool.tab);
      diagram.model.setDataProperty(textBlock.part.data, "alias", customSelectBox.value);
    },false)

    var loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
    var pos = diagram.transformDocToView(loc);
    customSelectBox.style.left = pos.x - 2 + "px";
    customSelectBox.style.top  = pos.y - 2 + "px";
    customSelectBox.style.width = "100px";
    customSelectBox.style.position = 'absolute';
    customSelectBox.style.borderColor  = "white";
    customSelectBox.style.backgroundColor  = darkergray;
    customSelectBox.style.borderWidth  = "5px";
    
    customSelectBox.style.zIndex = 100; // place it in front of the Diagram

    if (diagram.div !== null) diagram.div.appendChild(customSelectBox);
    customSelectBox.focus();
  }

  varEditor.hide = function(diagram, tool) {
    diagram.div.removeChild(customSelectBox);
  }

  varEditor.valueFunction = function() { return customSelectBox.value; }

  window.VarEditorSelectBox = varEditor;
})(window);