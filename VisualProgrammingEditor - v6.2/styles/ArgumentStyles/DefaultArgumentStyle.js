function argShapeStyle() {
  return {
    name: "NODEARGSHAPE",
    background:  argDefaultColor,
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
      { defaultAlignment: go.Spot.Left ,
        stretch: go.GraphObject.Horizontal,
        defaultStretch: go.GraphObject.Horizontal,
        defaultColumnSeparatorStroke: "gray",
        defaultRowSeparatorStroke: "gray",},


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
      $(go.Shape, "TriangleRight", { desiredSize: new go.Size(10, 10), fill: "white", stroke: null, fill: null, column: 0 }),
      argShapeStyle(), 
      new go.Binding("toLinkable", "itemIndex", function(v, shape) {
        const inLinks = shape.part.findLinksInto();
        var linkIterator = inLinks.iterator;

        while(linkIterator.next()) {
          var i_item = linkIterator.value;
          parentNode = myDiagram.findNodeForKey(i_item.data.from)

          if(i_item.data.type == "Reversed") {break;}
        }
        return (parentNode.data.type == "array");
      }).ofObject(),
      new go.Binding("portId", "portId", function(v) { return ("inSlot" + v)}),
      new go.Binding("background", "itemIndex", function(v, shape) {
          if(!shape.data.isport && !shape.data.paramtext && !shape.data.connectedBlock) {
            return "#fc554c"
          }
          else if( v < shape.part.data.arity.from){
            return argFixedColor;
          }
          return argDefaultColor;
      }).ofObject(),
      
      $(go.TextBlock, //portId lport
        {width: 30, column: 1 }, //width less than 40 cause of margin
        { width: 60,
          font: "bold 12pt sans-serif"},
        
        new go.Binding("text", "portId"),
        new go.Binding("visible", "icon", function(v) { return !v }),
      ),
      $(go.Picture, "",//portId lport
        {column: 1 }, //width less than 40 cause of margin
        {width: 20, height: 20},
        new go.Binding("visible", "icon", function(v) { return v != "" }),
        new go.Binding("source", "icon", function(v) { return "./images/" + v}),
        
      ),

      $(go.Panel, "Auto", //textfield
        { alignment: go.Spot.Center, column: 2, minSize: new go.Size(50, NaN)},
        $(go.TextBlock, {editable: true, background: "white", stretch: go.GraphObject.Horizontal,},
          new go.Binding("text", "paramtext").makeTwoWay(),
          new go.Binding("editable", "isport", function(v) {return !v}),
          new go.Binding("visible", "connectedBlock", function(v) { return !v }),
          new go.Binding("background", "isport", function(v) {return v ? "lightgray" : "white"}),
          {
            textEdited: function(tb, olds, news) {
              tb.part.updateTargetBindings();
            }
          }
        ),
      ),

      $(go.Panel, "Auto",
        { alignment: go.Spot.Right, column: 3},
        $(go.Shape, "Circle", portStyle(false),  // the rvalue port
          new go.Binding("portId", "portId"),
          { fill: "black", visible: false},
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