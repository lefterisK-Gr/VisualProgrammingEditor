var mathPaletteComps = [
  {key: 1, type: "arithmeticOperatorGroup", isGroup: true},
  {key: 2, type: "arithmeticOperator", alias: "+", group: 1},
  {key: 3, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 1},
];

var mathPaletteLinks = [
  { category: "Reversed", from: 2, to: 3},
];