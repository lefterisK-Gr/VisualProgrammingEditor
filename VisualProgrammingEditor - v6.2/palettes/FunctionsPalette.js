var paletteComps3 = [
    {key: 1, type: "functionGroup", isGroup: true},
    {key: 2, type: "function", group: 1},
    {key: 3, type: "parameters", items: [ 
        {portId: "1"},
        {portId: "2"},
    ], group: 1},
    {key: 4, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
    ], group: 1},

    {key: 5, type: "callGroup", isGroup: true},
    {key: 6, type: "call", group: 5},
    {key: 7, type: "args", items: [
        {portId: "1"},
        {portId: "2"},
    ], group: 5}
]

var paletteLinks3 = [
    { category: "Reversed", from: 2, to: 3},
    { from: 3, to: 4, fromPort: "( )", toPort: "in"},

    { category: "Reversed", from: 6, to: 7},
]