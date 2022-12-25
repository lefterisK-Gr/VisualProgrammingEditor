var logicPaletteComps = [

  {key: 1, type: "ifGroup", isGroup: true},
  {key: 2, type: "if", group: 1},
  {key: 3, type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
    {portId: "condition"},
    {portId: "if_part", connectedBlock: true},
    {portId: "else_part", connectedBlock: true}, 
  ], group: 1},
  {key: 4, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 1},
  {key: 5, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 1},
  { key: -1, text: "Enter Comment", type: "Comment", group: 1 },

  {key: 6, type: "relationalOperatorGroup", isGroup: true},
  {key: 7, type: "relationalOperator", alias: ">", group: 6},
  {key: 8, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 6},
  { key: -2, text: "Enter Comment", type: "Comment", group: 6 },

  {key: 9, type: "unaryOperatorGroup", isGroup: true},
  {key: 10, type: "unaryOperator", alias: "!", group: 9},
  {key: 11, type: "args", arity: { "from" : 1, "to": 1 }, items: [ 
    {portId: "1"}
  ], group: 9},
  { key: -3, text: "Enter Comment", type: "Comment", group: 9 },

  {key: 12, type: "binaryOperatorGroup", isGroup: true},
  {key: 13, type: "binaryOperator", alias: "&&", group: 12},
  {key: 14, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 12},
  { key: -4, text: "Enter Comment", type: "Comment", group: 12 },

];

var logicPaletteLinks = [
  { category: "Reversed", from: 2, to: 3},
  { from: 3, to: 4 , fromPort: "if_part", toPort: "in"},
  { from: 3, to: 5 , fromPort: "else_part", toPort: "in"},
  { from: -1, to: 2, category: "Comment" },

  { category: "Reversed", from: 7, to: 8},
  { from: -2, to: 7, category: "Comment" },

  { category: "Reversed", from: 10, to: 11},
  { from: -3, to: 10, category: "Comment" },

  { category: "Reversed", from: 13, to: 14},
  { from: -4, to: 13, category: "Comment" },
];