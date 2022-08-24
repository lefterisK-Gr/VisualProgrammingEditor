      
      var nodeHoverAdornment =
          $(go.Adornment, "Spot",
          {
            mouseLeave: (e, obj) => {
            var ad = obj.part;
            ad.adornedPart.removeAdornment("mouseEnter");
            }
          },
          $(go.Placeholder,
              {
              //background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
              isActionable: true,  // needed because this is in a temporary Layer
              click: (e, obj) => {
                  var node = obj.part.adornedPart;
                  node.diagram.select(node);
              }
              }),
          $("Button",
              { alignment: go.Spot.Right, alignmentFocus: go.Spot.BottomLeft },
              { click: (e, obj) => activatePort(obj.part.adornedObject) },
              $(go.TextBlock, "Add port")),
          $("Button",
              { alignment: go.Spot.Right, alignmentFocus: go.Spot.TopLeft },
              { click: (e, obj) => {
                activateTextField(obj.part.adornedObject)} 
              },
              $(go.TextBlock, "Add variable/value"))
          );

      var argTemplate = 
        $(go.Panel,"Auto", 
          $(go.Shape, "Rectangle", node_Var_ShapeStyle(),
            new go.Binding("stroke", "fixed", function(v) {
              if (v == true)
                return "blue";
              return "darkslategray";
            }),
            new go.Binding("fill", "fixed", function(v) {
              if (v == true)
                return "#6BCEFF";
              return "lightgray";
            })),
          $(go.Shape, "Rectangle", portStyle(false),  // the rvalue port
            new go.Binding("portId", "portId"),
            { alignment: go.Spot.Right, alignmentFocus: go.Spot.Right ,opacity: 0.3, visible: false},
            new go.Binding("visible", "isport")
          ), 
          $(go.TextBlock, {editable: true, alignment: go.Spot.Right, margin: new go.Margin(0,5,0,0), visible: false, background: "white", width: 50},
            new go.Binding("text", "paramtext").makeTwoWay(),
            new go.Binding("visible", "isport", function(v) {return  !v})
          ),
          $(go.TextBlock, {editable: true, alignment: go.Spot.Left, margin: new go.Margin(0,0,0,10)},
            new go.Binding("text", "portId")
          ),
          {
            mouseEnter: (e, obj) => {
                var node = obj;
                //console.log(node.data);
                obj.part.removeAdornment("mouseEnter");
                
                nodeHoverAdornment.adornedObject = node;
                node.part.addAdornment("mouseEnter", nodeHoverAdornment);
              }
          }
        );

      var argsTemplate = 
        $(go.Node,"Vertical", selectionStyle(), 
          $(go.Panel, "Vertical",
            new go.Binding("itemArray","items"),
            {
              itemTemplate: argTemplate
            }
          ),
          $(go.Panel, "Horizontal",
            {alignment: go.Spot.Left},
            $("Button",
              $(go.Shape, "PlusLine", { width: 10, height: 10 }),
              {
                name: "BUTTON", 
                click: (e, button) => addArg(button.part)
              },
            ),
            $("Button",
              $(go.Shape, "MinusLine", { width: 10, height: 10 }),
              { 
                name: "BUTTON2", 
                click: (e, button) => removeArg(button.part)
              }
            )   
          )
        );

      function addArg(arg) {
        if (!(arg instanceof go.Node)) return;
        
        let i = 1;
        while (arg.findPort( i.toString() +":") !== arg) 
        {
          i++;
        }
        const name = i.toString()+":";
        const arr = arg.data.items;
        if(arg.data.arity && arg.data.arity.to && arr.length == arg.data.arity.to)
          return;

        myDiagram.startTransaction("add argument"); 
        if (arr) {
          // create a new port data object
          const newportdata = {
            portId: name
          };
          // and add it to the end of Array of port data
          myDiagram.model.insertArrayItem(arr, -1, newportdata);
        }
        myDiagram.commitTransaction("add argument");
      }

      function removeArg(arg) {
        if (!arg) return;
        var arr = arg.data.items;
        if(arg.data.arity && arg.data.arity.from && arr.length == arg.data.arity.from)
          return;
        
        myDiagram.startTransaction("remove argument");
        myDiagram.model.removeArrayItem(arr);
        myDiagram.commitTransaction("remove argument");
      }

    function activatePort(port) {
      myDiagram.startTransaction("colorPort");
      const data = port.data;
      console.log(data);
      myDiagram.model.setDataProperty(data, "isport", true);
      myDiagram.commitTransaction("colorPort");
    }

    function activateTextField(argnode) {
      myDiagram.startTransaction("colorPort");
      const data = argnode.data;  
      //console.log(data);
      //console.log(argnode.part.data); //arguments

      links = argnode.part.findLinksOutOf();
      while(links.next()) {
        //console.log(links.value.data);
        if(links.value.data.fromPort == argnode.data.portId){
          myDiagram.remove(links.value);
        }
      }
      myDiagram.model.setDataProperty(data, "isport", false);
      myDiagram.commitTransaction("colorPort");
    }