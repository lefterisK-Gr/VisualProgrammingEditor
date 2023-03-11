var ioPaletteComps = [
  {key: 1, type: "printGroup", isGroup: true, fillCol: orangegrad},
  {key: 2, type: "print", group: 1, fillCol: orangegrad},
  {key: 3, type: "args", items: [ 
    {portId: "1"}, //remove portId, just args_via_object
    {portId: "2"} 
  ], group: 1},
];

var ioPaletteLinks = [
  { category: "Reversed", from: 2, to: 3},
];