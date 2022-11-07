function argShapeStyle() {
  return {
    name: "NODEARGSHAPE",
    fill:  argDefaultColor,
    stroke: argDefaultStroke,
    strokeWidth: 2
  };
}

function signsButton() {
return [
  $(go.Panel, "Horizontal",
    {alignment: go.Spot.Left},
    $("Button",
        {"ButtonBorder.fill": "lightgray",
        "_buttonFillNormal": "lightgray",
        "_buttonFillDisabled": "darkgray" },
        $(go.Shape, "PlusLine", { width: 10, height: 10 }),
        {
          name: "PLUSBUTTON", 
          click: (e, button) => addArg(button.part)
        },
        new go.Binding("isEnabled", "", function(v, shape) {
          return canHaveButton(shape.part, true);
        }).ofObject(),
    ),
    $("Button",
        {"ButtonBorder.fill": "lightgray",
        "_buttonFillNormal": "lightgray",
        "_buttonFillDisabled": "darkgray" },
        $(go.Shape, "MinusLine", { width: 10, height: 10 }),
        { 
          name: "MINUSBUTTON", 
          click: (e, button) => removeArg(button.part)
        },
        new go.Binding("isEnabled", "", function(v, shape) {
          return canHaveButton(shape.part, false);
        }).ofObject(),
    )
  )
]
}

function selectableArgStyle(varKind) {
return [
  $(go.TextBlock, 
    {row: 0, column: 1, alignment: go.Spot.Right},
    {editable: true, width: 100, margin: 5, background: lightergray},
    new go.Binding("visible", "isExistingVar", function(v) {return !v}),
    new go.Binding("text", "paramtext").makeTwoWay()),
  $(go.TextBlock, "Enter " + varKind, 
    {row: 0, column: 1, alignment: go.Spot.Right},
    {width: 100, margin: 5, background: darkergray, textEditor: window.VarEditorSelectBox, editable: true},
    
    //INTELLISENSE
    new go.Binding("choices", "itemIndex", function(v, args) {
      var nDeclared;
      var i = 0;
      var vobj

      stackFrames.some(stackFrame => {
        if(stackFrame.refs.indexOf(args.part.findLinksInto().first().data.from) >= 0)
        { 
          nDeclared = stackFrame.variables;
          return true;
        }
      });
      
      while(i < v) { // v is current itemIndex
        tempIndex = args.part.data.items[i].paramtext;
        if( !tempIndex ) break;
        vobj = (typeof nDeclared[tempIndex] == 'string') ? JSON.parse(nDeclared[tempIndex]) : nDeclared[tempIndex]

        if(typeof vobj === 'object'){
          nDeclared = vobj
        }
        i++;
      }
      return nDeclared ? Object.keys(nDeclared) : null;
    }).ofObject(),
    new go.Binding("visible", "isExistingVar"),
    new go.Binding("text", "paramtext").makeTwoWay(),
    {
      textEdited: function(tb, olds, news) {
        tb.part.updateTargetBindings("choices");
      }
    }
  )
]
}

function argsStyle() {
  return [
  selectionStyle(), 
  $(go.Panel, "Vertical", {name: "ARGS"},
      new go.Binding("itemArray", "items"),
      new go.Binding("itemTemplate", "type", function(v) {
          if(v == "decl")
              return varDeclArgTemplate;
          else if(v == "obj")
              return getElemArgTemplate;
          return argTemplate;
      })
  ),
  signsButton()
  ]
}

function argStyle() {
  return [
      $(go.Shape, "Rectangle", argShapeStyle(),
        new go.Binding("fill", "itemIndex", function(v, shape) {
            if( v < shape.part.data.arity.from)
                return argFixedColor;
            return argDefaultColor;
        }).ofObject()
      ),
      $(go.Panel, "Table",
        {
          defaultAlignment: go.Spot.Left,
          defaultColumnSeparatorStroke: "gray" //overriden by stroke of shape
        },
        $(go.RowColumnDefinition, { column: 0, width: 40 }),
        $(go.RowColumnDefinition, { column: 1, width: 80 }),
        $(go.TextBlock, //portId lport
          {row: 0, column: 0, width: 30 }, //width less than 40 cause of margin
          {margin: new go.Margin(2, 5, 2, 5)},
          new go.Binding("text", "portId")
        ),
        $(go.Panel, "Auto",
          {row: 0, column: 1, alignment: go.Spot.Right},
          $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port
            new go.Binding("portId", "portId"),
            { fill: "black", visible: false},
            new go.Binding("visible", "isport")
          )
        ),
        $(go.Panel, "Auto", //textfield
          {row:0, column: 1, alignment: go.Spot.Center},
          $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
            new go.Binding("text", "paramtext").makeTwoWay(),
            new go.Binding("visible", "isport", function(v) {return !v})
          ),
        ),
      ),
      {
        click: (e, obj) => {
          onArgClick(e, obj, settingsAdornmentMap["DEFAULT ARGUMENT"]);
        }
      }
  ]
}