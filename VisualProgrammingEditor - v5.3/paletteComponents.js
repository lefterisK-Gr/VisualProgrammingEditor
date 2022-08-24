
    var paletteComps = [  // specify the contents of the Palette

            {key: "printGroupKey", category: "printGroup", isGroup: true},
            {key: "printFunction",category: "print", type: "print", group: "printGroupKey"},
            {key: "printArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "printGroupKey"},

            {key: "varsGroupKey", category: "varsGroup", isGroup: true},
            {key: "varsFunction",category: "vars", type: "vars", group: "varsGroupKey"},
            {key: "varsArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "varsGroupKey"},

            {key: "ifGroupKey", category: "ifGroup", isGroup: true},
            {key: "ifFunction",category: "if", type: "if", group: "ifGroupKey"},
            {key: "ifArguments", category: "args", "arity": { "from" : 2 , "to": 3}, items: [ 
              {portId: "condition:", fixed: true},
              {portId: "if_part:", fixed: true},
              {portId: "else_part:"}, 
            ], group: "ifGroupKey"},

            {key: "whileGroupKey", category: "whileGroup", isGroup: true},
            {key: "whileFunction",category: "while", type: "while", group: "whileGroupKey"},
            {key: "whileArguments", category: "args", "arity": { "from" : 2 , "to": 2}, items: [ 
              {portId: "condition:", fixed: true},
              {portId: "if_true_part:", fixed: true} 
            ], group: "whileGroupKey"},

            {key: "forGroupKey", category: "forGroup", isGroup: true},
            {key: "forFunction",category: "for", type: "for", group: "forGroupKey"},
            {key: "forArguments", category: "args", "arity": { "from" : 4 , "to": 4}, items: [ 
              {portId: "initialize:", fixed: true},
              {portId: "condition:", fixed: true},
              {portId: "update:", fixed: true},
              {portId: "contains:", fixed: true},
            ], group: "forGroupKey"},


            { category: "blocks", type: "blocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: "printFunction", to: "printArguments"},
            { category: "Reversed", from: "varsFunction", to: "varsArguments"},
            { category: "Reversed", from: "ifFunction", to: "ifArguments"},
            { category: "Reversed", from: "whileFunction", to: "whileArguments"},
            { category: "Reversed", from: "forFunction", to: "forArguments"},
        ]

    var paletteComps2 = [

        {key: "assignGroupKey", category: "assignGroup", isGroup: true},
        {key: "assignFunction",category: "assign", type: "operation", alias: "=",  group: "assignGroupKey"},
        {key: "assignArguments", category: "args", "arity": { "from" : 2}, items: [ 
          {portId: "lvalue:", fixed: true},
          {portId: "rvalue:", fixed: true} 
        ], group: "assignGroupKey"},

        {key: "plusGroupKey", category: "plusGroup", isGroup: true},
        {key: "plusFunction",category: "plus", type: "operation", alias: "+", group: "plusGroupKey"},
        {key: "plusArguments", category: "args", "arity": { "from" : 2 }, items: [ 
          {portId: "lhs:", fixed: true},
          {portId: "rhs:", fixed: true} 
        ], group: "plusGroupKey"},

        {key: "varsGroupKey", category: "varsGroup", isGroup: true},
        {key: "varsFunction",category: "vars", type: "varsRef", group: "varsGroupKey"},
        {key: "varsArguments", category: "args", items: [ 
          {portId: "1:", fixed: true},
          {portId: "2:", fixed: true} 
        ], group: "varsGroupKey"}
    ]

var paletteLinks2 = [
        { category: "Reversed", from: "assignFunction", to: "assignArguments"},
        { category: "Reversed", from: "plusFunction", to: "plusArguments"},
        { category: "Reversed", from: "varsFunction", to: "varsArguments"},
    ]