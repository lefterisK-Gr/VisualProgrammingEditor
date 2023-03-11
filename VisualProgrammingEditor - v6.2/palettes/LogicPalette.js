var logicPaletteComps = [

  {key: 1, type: "ifGroup", isGroup: true, fillCol: greengrad},
  {key: 2, type: "if", group: 1, fillCol: greengrad},
  {key: 3, type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
    {portId: "condition", icon:"condition.png"},
    {portId: "if part", icon:"whiteCircle.png", connectedBlock: true},
    {portId: "else part",icon:"blackCircle.png", connectedBlock: true}, 
  ], group: 1},
  {key: 4, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 1},
  {key: 5, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 1},

  {key: 6, type: "relationalOperatorGroup", isGroup: true, fillCol: yellowgreengrad},
  {key: 7, type: "relationalOperator", alias: ">", group: 6, fillCol: yellowgreengrad},
  {key: 8, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 6},

  {key: 9, type: "unaryOperatorGroup", isGroup: true, fillCol: yellowbluegrad},
  {key: 10, type: "unaryOperator", alias: "!", group: 9, fillCol: yellowbluegrad},
  {key: 11, type: "args", arity: { "from" : 1, "to": 1 }, items: [ 
    {portId: "1"}
  ], group: 9},

  {key: 12, type: "binaryOperatorGroup", isGroup: true, fillCol: yellowredgrad},
  {key: 13, type: "binaryOperator", alias: "&&", group: 12, fillCol: yellowredgrad},
  {key: 14, type: "args", arity: { "from" : 2 }, items: [ 
    {portId: "1"},
    {portId: "2"} 
  ], group: 12},

];

var logicPaletteLinks = [
  { category: "Reversed", from: 2, to: 3},
  { from: 3, to: 4 , fromPort: "if part", toPort: "in"},
  { from: 3, to: 5 , fromPort: "else part", toPort: "in"},

  { category: "Reversed", from: 7, to: 8},

  { category: "Reversed", from: 10, to: 11},

  { category: "Reversed", from: 13, to: 14},

];