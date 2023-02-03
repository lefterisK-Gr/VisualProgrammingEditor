var loopsPaletteComps = [
  {key: 1, type: "whileGroup", isGroup: true},
  {key: 2, type: "while", group: 1},
  {key: 3, type: "args", arity: { "from" : 2 , "to": 2}, items: [ 
    {portId: "condition", icon: "for-condition.png"},
    {portId: "action", icon: "for-action.png",connectedBlock: true} 
  ], group: 1},
  {key: 4, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 1},

  {key: 5, type: "forGroup", isGroup: true},
  {key: 6, type: "for", group: 5},
  {key: 7, type: "args", arity: { "from" : 4 , "to": 4}, items: [ 
    {portId: "(x)"},
    {portId: "condition",icon: "for-condition.png"},
    {portId: "update", icon: "for-update.png"},
    {portId: "action",icon: "for-action.png", connectedBlock: true},
  ], group: 5},
  {key: 8, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
  ], group: 5},

  { key: 9, type: "breakGroup", isGroup: true },
  { key: 10, type: "break", group: 9 },

  { key: 11, type: "continueGroup", isGroup: true },
  { key: 12, type: "continue", group: 11 },
];

var loopsPaletteLinks = [

  { category: "Reversed", from: 2, to: 3},
  { from: 3, to: 4 , fromPort: "action", toPort: "in"},

  { category: "Reversed", from: 6, to: 7},
  { from: 7, to: 8 , fromPort: "action", toPort: "in"},

];