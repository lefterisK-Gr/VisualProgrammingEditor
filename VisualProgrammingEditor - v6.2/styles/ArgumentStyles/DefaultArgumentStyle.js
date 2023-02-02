function argShapeStyle() {
  return {
    name: "NODEARGSHAPE",
    fill:  argDefaultColor,
    stroke: argDefaultStroke,
    strokeWidth: 2,
    toSpot: go.Spot.Left
  };
}

function signsButton(isHorizontal) {
return [
  $(go.Panel, isHorizontal ? "Horizontal" : "Vertical", //isHorizontal? "Horizontal" : "Vertical"
    new go.Binding("visible", "type", function(v, node) {
      const data = node.part.data;
      if(data.arity && (data.arity.from == data.arity.to)){
        return false;
      }
      return true;
    }),
    {
      alignment: isHorizontal ? go.Spot.BottomLeft : go.Spot.TopRight,
      alignmentFocus: go.Spot.TopLeft
    },
    $("Button",
        {"ButtonBorder.fill": "lightgray",
        "_buttonFillNormal": "lightgray",
        "_buttonFillDisabled": "darkgray" },
        $(go.Shape, "PlusLine", { width: 10, height: 10 }),
        {
          name: "PLUSBUTTON", 
          click: (e, button) => addArg(button.part)
        },
        new go.Binding("isEnabled", "", function(v, shape) { //no source?
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
    new go.Binding("choices", "itemIndex", argChoicesIntellisense).ofObject(),

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
  new go.Binding("visible"),
  new go.Binding("visible", "key", function(v, node) {
    if(myDiagram.findNodeForKey(v)) {
      return true
    }
    return false;
  }).ofObject(),
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  selectionStyle(), 
  $(go.Panel, "Auto",
    $(go.Shape, "Rectangle", {fill: 'white'},
      new go.Binding("stroke", "isHighlighted", h => h ? "#7F00FF" : "darkslategray").ofObject(),
      new go.Binding("strokeWidth", "isHighlighted", h => h ? 8 : 2).ofObject()
    ),
    $(go.Panel, "Table",
      {
        name: "TABLE", stretch: go.GraphObject.Horizontal,
        minSize: new go.Size(100, 10),
        defaultAlignment: go.Spot.Left,
        defaultStretch: go.GraphObject.Horizontal,
        defaultColumnSeparatorStroke: "gray",
        defaultRowSeparatorStroke: "gray",
      },
      new go.Binding("itemArray", "items"),
      new go.Binding("itemTemplate", "type", function(v) {
          if(v == "decl")
              return varDeclArgTemplate;
          else if(v == "propertyAccesors")
              return getElemArgTemplate;
          else if(v == "var")
              return varArgTemplate;
          return argTemplate;
      })
    )
  ),
  signsButton(true)
  ]
}

function argStyle() {
  return [

        $(go.Panel, "TableRow",
          $(go.TextBlock, //portId lport
            {
              column: 0,
              margin: new go.Margin(2, 5, 2, 5),
              width: 60
            },
            new go.Binding("text", "portId")
          ),
          
          $(go.TextBlock, {column: 1,editable: true, visible: false, background: "white",  minSize: new go.Size( 150, 15 ),},
            new go.Binding("text", "paramtext").makeTwoWay(),
            new go.Binding("visible", "isport", function(v) {return !v})
          ),
          $(go.Shape, "TriangleLeft", portStyle(false),  // the rvalue port  
          new go.Binding("portId", "portId"),
            { fill: "black", visible: false, column: 2,},
            new go.Binding("visible", "isport")
          )
        ),

      
      {
        click: (e, obj) => {
          onArgClick(e, obj, settingsAdornmentMap["DEFAULT ARGUMENT"]);
        }
      }
  ]
}