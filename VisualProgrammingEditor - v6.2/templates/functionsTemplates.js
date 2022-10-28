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
	var lightergray = "#E9E9E9";
	var darkergray = "#A0A0A0"

	const operatorNameMap = {
		"ARITHMETIC OP":    arithmOperatorMap,
		"RELATIONAL OP":    relationalOperatorMap,
		"UNARY OP":         unaryOperatorMap,
		"BINARY OP":        binaryOperatorMap,
	}
