var objectArrayPaletteComps = [
  {key: 1, type: "objectGroup", isGroup: true, fillCol: browngrad},
  {key: 2, type: "object", group: 1, fillCol: browngrad},
  {key: 3, type: "decl", items: [ 
    {portId: "1"},
    {portId: "2"}
  ], group: 1},

  {key: 4, type: "arrayGroup", isGroup: true, fillCol: lightbluegreengrad},
  {key: 5, type: "array", group: 4, fillCol: lightbluegreengrad},
  {key: 6, type: "args", items: [ 
    {portId: "1"},
    {portId: "2"}
  ], group: 4},

  {key: 7, type: "getElemGroup", isGroup: true, fillCol: redpinkgrad},
  {key: 8, type: "getElem", group: 7, fillCol: redpinkgrad},
  {key: 9, type: "propertyAccesors", arity: { "from" : 2 }, items: [
    {portId: "obj"},
    {portId: "key1"}
  ], group: 7},
];

var objectArrayPaletteLinks = [

  { category: "Reversed", from: 2, to: 3},

  { category: "Reversed", from: 5, to: 6},

  { category: "Reversed", from: 8, to: 9},

];