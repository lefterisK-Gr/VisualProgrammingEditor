var paletteComps2 = [

    {key: 20, type: "arithmeticOperatorGroup", isGroup: true},
    {key: 21, type: "arithmeticOperator", alias: "+", group: 20},
    {key: 22, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 20},

    {key: 23, type: "relationalOperatorGroup", isGroup: true},
    {key: 24, type: "relationalOperator", alias: ">", group: 23},
    {key: 25, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 23},

    {key: 26, type: "unaryOperatorGroup", isGroup: true},
    {key: 27, type: "unaryOperator", alias: "!", group: 26},
    {key: 28, type: "args", arity: { "from" : 1, "to": 1 }, items: [ 
      {portId: "1"}
    ], group: 26},

    {key: 29, type: "binaryOperatorGroup", isGroup: true},
    {key: 30, type: "binaryOperator", alias: "&&", group: 29},
    {key: 31, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "1"},
      {portId: "2"} 
    ], group: 29},

    {key: 32, type: "assignGroup", isGroup: true},
    {key: 33, type: "assign", group: 32},
    {key: 34, type: "args", arity: { "from" : 2 }, items: [ 
      {portId: "lhs"},
      {portId: "rhs"}
    ], group: 32},

    {key: 35, type: "varsReferGroup", isGroup: true},
    {key: 36, type: "varsRefer", group: 35},
    {key: 37, type: "var", arity: { "from" : 1, "to": 1 }, items: [ //dont need to have items
      {portId: "var"}
    ], group: 35},

    {key: 38, type: "getElemGroup", isGroup: true},
    {key: 39, type: "getElem", group: 38},
    {key: 40, type: "obj", arity: { "from" : 2 }, items: [
      {portId: "obj"},
      {portId: "key1"}
    ], group: 38},

    {key: 41, type: "objectGroup", isGroup: true},
    {key: 42, type: "object", group: 41},
    {key: 43, type: "decl", items: [ 
      {portId: "1"},
      {portId: "2"}
    ], group: 41}
]

var paletteLinks2 = [
    { category: "Reversed", from: 21, to: 22},
    { category: "Reversed", from: 24, to: 25},
    { category: "Reversed", from: 27, to: 28},
    { category: "Reversed", from: 30, to: 31},
    { category: "Reversed", from: 33, to: 34},
    { category: "Reversed", from: 36, to: 37},
    { category: "Reversed", from: 39, to: 40},
    { category: "Reversed", from: 42, to: 43},
]