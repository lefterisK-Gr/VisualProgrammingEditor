var objectArrayPaletteComps = [
  {key: 1, type: "objectGroup", isGroup: true},
  {key: 2, type: "object", group: 1},
  {key: 3, type: "decl", items: [ 
    {portId: "1"},
    {portId: "2"}
  ], group: 1},
  { key: -1, text: "Enter Comment", type: "Comment", group: 1 },

  {key: 4, type: "arrayGroup", isGroup: true},
  {key: 5, type: "array", group: 4},
  {key: 6, type: "args", items: [ 
    {portId: "1"},
    {portId: "2"}
  ], group: 4},
  { key: -2, text: "Enter Comment", type: "Comment", group: 4 },

  {key: 7, type: "getElemGroup", isGroup: true},
  {key: 8, type: "getElem", group: 7},
  {key: 9, type: "propertyAccesors", arity: { "from" : 2 }, items: [
    {portId: "obj"},
    {portId: "key1"}
  ], group: 7},
  { key: -3, text: "Enter Comment", type: "Comment", group: 7 },
];

var objectArrayPaletteLinks = [

  { category: "Reversed", from: 2, to: 3},
  { from: -1, to: 2, category: "Comment" },

  { category: "Reversed", from: 5, to: 6},
  { from: -2, to: 5, category: "Comment" },

  { category: "Reversed", from: 8, to: 9},
  { from: -3, to: 8, category: "Comment" },

];