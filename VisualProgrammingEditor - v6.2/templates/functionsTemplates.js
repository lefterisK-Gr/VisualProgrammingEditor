	//0: up 1: down
	var orangegrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" });
	var greengrad = $(go.Brush, "Linear", { 0: "#98FB98", 1: "#9ACD32" });
	var lightbluegrad = $(go.Brush, "Linear", { 0: "#B0E0E6", 1: "#87CEEB" });
	var bluegrad = $(go.Brush, "Linear", { 0: "#3333ff", 1: "#6666ff" });
	var purplegrad = $(go.Brush, "Linear", { 0: "#9A00FF", 1: "#B84BFF" });
	var redpinkgrad = $(go.Brush, "Linear", { 0: "#CC0066", 1: "#FF3399" });
	var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(255, 255, 102)" });
	var yellowgreengrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(102, 255, 102)" });
	var yellowbluegrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(102, 102, 255)" });
	var yellowredgrad = $(go.Brush, "Linear", { 0: "rgb(255, 255, 0)", 1: "rgb(255, 102, 102)" });
	var browngrad = $(go.Brush, "Linear", { 0: "rgb(153, 102, 0)", 1: "rgb(204, 136, 0)" });
	var lightbluegreengrad = $(go.Brush, "Linear", { 0: "#00CC66", 1: "#33FF99" })
	var lightergray = "#E9E9E9";
	var darkergray = "#A0A0A0"

	const choiceOperatorPropMap = {
		"ARITHMETIC OP":    arithmOperatorMap,
		"RELATIONAL OP":    relationalOperatorMap,
		"UNARY OP":         unaryOperatorMap,
		"BINARY OP":        binaryOperatorMap,
	}
	
	var breakpoints = [];

	function levelFunctionNamesIntellisense(v, args) {
		var fDeclared; //function Declared
		console.log(functionStackFrames)
		functionStackFrames.some(stackFrame => {
			console.log(stackFrame)
			if(stackFrame.refs.indexOf(args.part.data.key) >= 0)
      { 
        fDeclared = stackFrame.functions;
      }
		})
		console.log(functionStackFrames[0].functions)
		console.log(fDeclared)
		return fDeclared ? fDeclared : null;
	}

	var nodeHoverAdornment =
		$(go.Adornment, "Spot",
			{
				mouseEnter: (e, obj) => {
					var ad = obj.part;
					ad.adornedPart.addAdornment("mouseHover", nodeHoverAdornment);
				}
			},
			{
				mouseLeave: (e, obj) => {
					var ad = obj.part;
					ad.adornedPart.removeAdornment("mouseHover");
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
				{
					width: 12,
					height: 12,
					margin: 2,
					// set properties on the border Shape of the "Button"
					"ButtonBorder.figure": "Circle",
					"ButtonBorder.fill": "#FF6666",
					// set properties on the "Button" itself used by its event handlers
					"_buttonFillOver": "red",
					click: (e, obj) => activateBreakpoint(obj.part.adornedObject)
				},
				{ alignment: new go.Spot(0.55, 0.8) }
			),
			// $(go.Shape, "Circle",
			// 	{width: 12, height: 12, fill: "red"},
			//   { alignment: new go.Spot(0.55, 0.8), alignmentFocus: go.Spot.Center })
		);

	function activateBreakpoint(arg) {
		myDiagram.startTransaction("makeBreakpoint");
		const data = arg.data;
		if(data.breakpoint) {
			const index = breakpoints.indexOf(data.key);
			if (index > -1) {
				breakpoints.splice(index, 1);
			}
			myDiagram.model.setDataProperty(data, "breakpoint", false);
		}
		else {
			breakpoints.push(data.key);
			myDiagram.model.setDataProperty(data, "breakpoint", true);
		}
		myDiagram.commitTransaction("makeBreakpoint");
	}