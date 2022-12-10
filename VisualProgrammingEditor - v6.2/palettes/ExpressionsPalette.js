var paletteComps2 = [

    {key: 1, type: "arithmeticOperatorGroup", isGroup: true},
    {key: 2, type: "arithmeticOperator", alias: "+", group: 1},
    {key: 3, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 1},

    {key: 4, type: "relationalOperatorGroup", isGroup: true},
    {key: 5, type: "relationalOperator", alias: ">", group: 4},
    {key: 6, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 4},

    {key: 7, type: "unaryOperatorGroup", isGroup: true},
    {key: 8, type: "unaryOperator", alias: "!", group: 7},
    {key: 9, type: "args", arity: { "from" : 1, "to": 1 }, items: [ 
      {portId: "1"}
    ], group: 7},

    {key: 10, type: "binaryOperatorGroup", isGroup: true},
    {key: 11, type: "binaryOperator", alias: "&&", group: 10},
    {key: 12, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 10},

    {key: 13, type: "assignGroup", isGroup: true},
    {key: 14, type: "assign", group: 13},
    {key: 15, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "lhs"},
      {portId: "rhs"}
    ], group: 13},

    {key: 16, type: "varsReferGroup", isGroup: true},
    {key: 17, type: "varsRefer", group: 16},
    {key: 18, type: "var", arity: { "from" : 1, "to": 1 }, items: [ //dont need to have items
      {portId: "var"}
    ], group: 16},

    {key: 19, type: "getElemGroup", isGroup: true},
    {key: 20, type: "getElem", group: 19},
    {key: 21, type: "propertyAccesors", arity: { "from" : 2 }, items: [
      {portId: "obj"},
      {portId: "key1"}
    ], group: 19},

    {key: 22, type: "objectGroup", isGroup: true},
    {key: 23, type: "object", group: 22},
    {key: 24, type: "decl", items: [ 
      {portId: "1"},
      {portId: "2"}
    ], group: 22},

    {key: 25, type: "arrayGroup", isGroup: true},
    {key: 26, type: "array", group: 25},
    {key: 27, type: "args", items: [ 
      {portId: "1"},
      {portId: "2"}
    ], group: 25},
]

var paletteLinks2 = [
    { category: "Reversed", from: 2, to: 3},
    { category: "Reversed", from: 5, to: 6},
    { category: "Reversed", from: 8, to: 9},
    { category: "Reversed", from: 11, to: 12},
    { category: "Reversed", from: 14, to: 15},
    { category: "Reversed", from: 17, to: 18},
    { category: "Reversed", from: 20, to: 21},
    { category: "Reversed", from: 23, to: 24},
    { category: "Reversed", from: 26, to: 27},
]