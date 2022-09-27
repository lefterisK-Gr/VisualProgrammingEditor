
    var paletteComps = [  // specify the contents of the Palette

            {key: "printGroupKey", type: "printGroup", isGroup: true},
            {key: "printFunction",type: "print", group: "printGroupKey"},
            {key: "printArguments", type: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "printGroupKey"},

            {key: "varsDeclGroupKey", type: "varsDeclGroup", isGroup: true},
            {key: "varsDeclFunction", type: "varsDecl", group: "varsDeclGroupKey"},
            {key: "varsDeclArguments", type: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "varsDeclGroupKey"},

            {key: "ifGroupKey", type: "ifGroup", isGroup: true},
            {key: "ifFunction",type: "if", group: "ifGroupKey"},
            {key: "ifArguments", type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
              {portId: "condition:"},
              {portId: "if_part:", connectedBlock: true},
              {portId: "else_part:"}, 
            ], group: "ifGroupKey"},
            {key: "ifFunArgBlock", type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: "ifGroupKey"},

            {key: "whileGroupKey", type: "whileGroup", isGroup: true},
            {key: "whileFunction",type: "while", group: "whileGroupKey"},
            {key: "whileArguments", type: "args", arity: { "from" : 2 , "to": 2}, items: [ 
              {portId: "condition:"},
              {portId: "if_true_part:", connectedBlock: true} 
            ], group: "whileGroupKey"},
            {key: "whileFunArgBlock", type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: "whileGroupKey"},

            {key: "forGroupKey", type: "forGroup", isGroup: true},
            {key: "forFunction",type: "for", group: "forGroupKey"},
            {key: "forArguments", type: "args", arity: { "from" : 4 , "to": 4}, items: [ 
              {portId: "initialize:"},
              {portId: "condition:"},
              {portId: "update:"},
              {portId: "contains:"},
            ], group: "forGroupKey"},
            {key: "forFunArgBlock", type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: "forGroupKey"},


            { key: "blocks", type: "blocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: "printFunction", to: "printArguments"},
            { category: "Reversed", from: "varsDeclFunction", to: "varsDeclArguments"},
            { category: "Reversed", from: "ifFunction", to: "ifArguments"},
            { from: "ifArguments", to: "ifFunArgBlock" , fromPort: "if_part:", toPort: "in"},
            { category: "Reversed", from: "whileFunction", to: "whileArguments"},
            { from: "whileArguments", to: "whileFunArgBlock" , fromPort: "if_true_part:", toPort: "in"},
            { category: "Reversed", from: "forFunction", to: "forArguments"},
            { from: "forArguments", to: "forFunArgBlock" , fromPort: "contains:", toPort: "in"}
        ]

    var paletteComps2 = [

        {key: "operatorGroupKey", type: "operatorGroup", isGroup: true},
        {key: "operatorFunction", type: "operation", alias: "+", group: "operatorGroupKey"},
        {key: "operatorArguments", type: "args", arity: { "from" : 2 }, items: [ 
          {portId: "lhs:"},
          {portId: "rhs:"} 
        ], group: "operatorGroupKey"},

        {key: "varsReferGroupKey", type: "varsReferGroup", isGroup: true},
        {key: "varsReferFunction", type: "varsRefer", group: "varsReferGroupKey"},
        {key: "varsArguments", type: "args", items: [ 
          {portId: "1:"},
          {portId: "2:"} 
        ], group: "varsReferGroupKey"}
    ]

var paletteLinks2 = [
        { category: "Reversed", from: "operatorFunction", to: "operatorArguments"},
        { category: "Reversed", from: "varsReferFunction", to: "varsArguments"},
    ]