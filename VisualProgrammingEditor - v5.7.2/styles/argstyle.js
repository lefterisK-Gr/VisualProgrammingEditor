function argShapeStyle() {
    return {
      name: "NODEARGSHAPE",
      fill:  argDefaultColor,
      stroke: argDefaultStroke,
      strokeWidth: 2
    };
  }

function argVarShapeStyle(isBigger) {
    return {
        name: "NODEVARARGSHAPE",
        fill:  argDefaultColor,
        stroke: argDefaultStroke,
        desiredSize: isBigger ? new go.Size(60, 20) : new go.Size(40, 20),
        strokeWidth: 2
    };
}

function signButton() {
  return [
    $(go.Panel, "Horizontal",
      {alignment: go.Spot.Left},
      $("Button",
          $(go.Shape, "PlusLine", { width: 10, height: 10 }),
          {
            name: "PLUSBUTTON", 
            click: (e, button) => addArg(button.part)
          },
      ),
      $("Button",
          $(go.Shape, "MinusLine", { width: 10, height: 10 }),
          { 
            name: "MINUSBUTTON", 
            click: (e, button) => removeArg(button.part)
          }
      )
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
            else if(v == "var")
                return varArgTemplate;
            return argTemplate;
        })
    ),
    signButton()
    ]
}

function varArgsStyle() {
  return [
  selectionStyle(), 
  $(go.Panel, "Vertical", {name: "ARGS"},
      new go.Binding("itemArray", "items"),
      new go.Binding("itemTemplate", "type", function(v) {
          if(v == "decl")
              return varDeclArgTemplate;
          else if(v == "var")
              return varArgTemplate;
          return argTemplate;
      })
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
          else if(v == "var")
              return varArgTemplate;
          return argTemplate;
      })
  ),
  signButton()
  ]
}

function argStyle() {
    return [
        $(go.Shape, "Rectangle", argShapeStyle(),
          new go.Binding("fill", "itemIndex", function(v, shape) {
              if( v < shape.part.data.arity.from)
                  return isArgFixedColor;
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
          $(go.TextBlock, //portId
            { editable: true, row: 0, column: 0, width: 30 }, //width less than 40 cause of margin
            {margin: new go.Margin(2, 5, 2, 5)},
            new go.Binding("text", "portId")
          ),
          $(go.Panel, "Auto",
            {row: 0, column: 1, alignment: go.Spot.Right},
            $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
              new go.Binding("portId", "portId"),
              { opacity: 0.3, visible: false},
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
            onArgClick(e, obj, false);
          }
        }
        /*{
          mouseEnter: (e, obj) => {
            var node = obj;
            //console.log(node.data);
            obj.part.removeAdornment("mouseEnter");
            
            argHoverAdornment.adornedObject = node;
            node.part.addAdornment("mouseEnter", argHoverAdornment);
            }
        }*/
    ]
}

function varDeclArgStyle() {
    return [
        $(go.Shape, "Rectangle", argShapeStyle()),
        $(go.Panel, "Table",
          {
            defaultAlignment: go.Spot.Left,
            defaultColumnSeparatorStroke: "gray"
          },
          $(go.RowColumnDefinition, { column: 0, width: 40 }),
          $(go.RowColumnDefinition, { column: 1, width: 80 }),
          $(go.RowColumnDefinition, { column: 2, width: 80 }),
          $(go.RowColumnDefinition, { column: 1, background: lightergray }),
          $(go.TextBlock,  //portId
            {editable: true, row: 0, column: 0, width: 30},
            {margin: new go.Margin(2, 5, 2, 5)},
            new go.Binding("text", "portId")
          ),
          $(go.TextBlock, //var text
            {editable: true, row: 0, column: 1, width: 60},
            {margin: new go.Margin(2, 5, 2, 5)},
            new go.Binding("text", "variable").makeTwoWay()
          ),
          $(go.Panel, "Auto",
            {row: 0, column: 2,alignment: go.Spot.Right},
            $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
              new go.Binding("portId", "portId"),
              { opacity: 0.3, visible: false},
              new go.Binding("visible", "isport")
            )
          ),
          $(go.Panel, "Auto", //textfield
            {row:0, column: 2, alignment: go.Spot.Center},
            $(go.TextBlock, {editable: true, visible: false, background: "white", width: 50},
              new go.Binding("text", "paramtext").makeTwoWay(),
              new go.Binding("visible", "isport", function(v) {return !v})
            ),
          )
        ),
        {
          click: (e, obj) => {
            onArgClick(e, obj, false);
          }
        }
        /*
        {
          mouseEnter: (e, obj) => {
              var node = obj;
              obj.part.removeAdornment("mouseEnter");

              argHoverAdornment.adornedObject = node;
              node.part.addAdornment("mouseEnter", argHoverAdornment);
              }
        }*/
    ]
}

function varArgStyle() {
  return [
    $(go.Shape, { fill: "lightgrey" }),
    $(go.TextBlock, 
      {editable: true, width: 100, margin: 5, background: lightergray},
      new go.Binding("visible", "isExistingVar", function(v) {return !v}),
      new go.Binding("text", "paramtext").makeTwoWay()),
    $(go.TextBlock, "Enter Var", 
      {width: 100, margin: 5, background: darkergray, textEditor: window.VarEditorSelectBox, editable: true},
      new go.Binding("choices", "portId", function(v, args) {

        return refDeclaredVariables[args.part.findLinksInto().first().data.from];
      }),
      new go.Binding("visible", "isExistingVar"),
      new go.Binding("text", "paramtext").makeTwoWay()
    ),
    {
      click: (e, obj) => {
        onArgClick(e, obj, true);
      }
    }
    /*
    {
      mouseEnter: (e, obj) => {
          var node = obj;
          obj.part.removeAdornment("mouseEnter");

          varArgHoverAdornment.adornedObject = node;
          node.part.addAdornment("mouseEnter", varArgHoverAdornment);
          }
    }*/
  ]
}