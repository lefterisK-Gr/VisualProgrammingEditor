var paletteComps3 = [
    {key: 1, type: "functionGroup", isGroup: true},
    {key: 2, type: "function", group: 1},
    {key: 3, type: "decl", items: [ 
        {portId: "1"}, //remove portId, just args_via_object
        {portId: "2"} 
    ], group: 1},
]

var paletteLinks3 = [
    { category: "Reversed", from: 2, to: 3},
]