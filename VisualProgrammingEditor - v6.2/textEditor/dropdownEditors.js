"use strict";

const editorEnum = {
  varArg :    0,
  operator :  1,
  callName:   2
}

function editorShow(textBlock, diagram, tool, customSelectBox, selectEditor) {
  if (!(textBlock instanceof go.TextBlock)) return;

    // Populate the select box:
    customSelectBox.innerHTML = "";

    var list = textBlock.choices;
    // Perhaps give some default choices if textBlock.choices is null
    if (list === null) list = [];
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

    if(selectEditor == editorEnum.operator) {
      customSelectBox.style.left = pos.x - (diagram.scale * 10) + "px";
      customSelectBox.style.top  = pos.y - 5 + "px";
      customSelectBox.style.width = diagram.scale * 40 + "px";
      customSelectBox.style.position = 'absolute';
      customSelectBox.style.borderColor  = "#FFDE36";
      customSelectBox.style.backgroundColor  = "#FFFF36";
      customSelectBox.style.borderWidth  = "5px";
      customSelectBox.style.fontSize = diagram.scale + "rem";
    }
    else if (selectEditor == editorEnum.varArg) {
      customSelectBox.style.left = pos.x - 2 + "px";
      customSelectBox.style.top  = pos.y - 2 + "px";
      customSelectBox.style.width = diagram.scale * 100 + "px";
      customSelectBox.style.position = 'absolute';
      customSelectBox.style.borderColor  = "white";
      customSelectBox.style.backgroundColor  = darkergray;
      customSelectBox.style.borderWidth  = "2px";
      customSelectBox.style.fontSize = ( diagram.scale * 0.7 )+ "rem";
    }
    else if (selectEditor == editorEnum.callName) {
      customSelectBox.style.left = pos.x - 2 + "px";
      customSelectBox.style.top  = pos.y - 2 + "px";
      customSelectBox.style.width = diagram.scale * 80 + "px";
      customSelectBox.style.position = 'absolute';
      customSelectBox.style.borderColor  = "black";
      customSelectBox.style.backgroundColor  = "white";
      customSelectBox.style.borderWidth  = "3px";
      customSelectBox.style.fontSize = diagram.scale + "rem";
    }
    
    customSelectBox.style.zIndex = 100; // place it in front of the Diagram

    if (diagram.div !== null) diagram.div.appendChild(customSelectBox);
    customSelectBox.focus();
}

(function(window) {
  var operatorEditor = new go.HTMLInfo();

  var customSelectBox = document.createElement("select");

  operatorEditor.show = function(textBlock, diagram, tool) {
    editorShow(textBlock, diagram, tool, customSelectBox, editorEnum.operator);
  }

  operatorEditor.hide = function(diagram, tool) {
    diagram.div.removeChild(customSelectBox);
  }

  operatorEditor.valueFunction = function() { return customSelectBox.value; }

  window.OperatorEditorSelectBox = operatorEditor;
})(window);

(function(window) {
  var varEditor = new go.HTMLInfo();

  var customSelectBox = document.createElement("select");

  varEditor.show = function(textBlock, diagram, tool) {
    editorShow(textBlock, diagram, tool, customSelectBox, editorEnum.varArg);
  }

  varEditor.hide = function(diagram, tool) {
    diagram.div.removeChild(customSelectBox);
  }

  varEditor.valueFunction = function() { return customSelectBox.value; }

  window.VarEditorSelectBox = varEditor;
})(window);

(function(window) {
  var callEditor = new go.HTMLInfo();

  var customSelectBox = document.createElement("select");

  callEditor.show = function(textBlock, diagram, tool) {
    editorShow(textBlock, diagram, tool, customSelectBox, editorEnum.callName);
  }

  callEditor.hide = function(diagram, tool) {
    diagram.div.removeChild(customSelectBox);
  }

  callEditor.valueFunction = function() { return customSelectBox.value; }

  window.CallEditorSelectBox = callEditor;
})(window);