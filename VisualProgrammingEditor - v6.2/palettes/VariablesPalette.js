var variablesPaletteComps = [
  {key: 1, type: "varsDeclGroup", isGroup: true, fillCol: lightbluegrad},
  {key: 2, type: "varsDecl", group: 1, fillCol: lightbluegrad},
  {key: 3, type: "decl", items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 1},

  {key: 4, type: "assignGroup", isGroup: true, fillCol: bluegrad},
  {key: 5, type: "assign", group: 4, fillCol: bluegrad},
  {key: 6, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "lhs"},
    {portId: "rhs"}
  ], group: 4},

  {key: 7, type: "varsReferGroup", isGroup: true, fillCol: purplegrad},
  {key: 8, type: "varsRefer", group: 7, fillCol: purplegrad},
  {key: 9, type: "var", arity: { "from" : 1, "to": 1 }, items: [ //dont need to have items
    {portId: "var"}
  ], group: 7},
];

var variablesPaletteLinks = [

  { category: "Reversed", from: 2, to: 3},

  { category: "Reversed", from: 5, to: 6},

  { category: "Reversed", from: 8, to: 9},
  
];