
    var paletteComps = [  // specify the contents of the Palette
            //{category: "args", items: [ {portId: "lvalue"}, {portId: "rvalue"} ]},

            {key: "assignGroupKey", category: "assignGroup", isGroup: true},
            {key: "assignFunction",category: "assign", type: "operation", alias: "=",  group: "assignGroupKey"},
            {key: "assignArguments", category: "args", items: [ 
              {portId: "lvalue:"},
              {portId: "rvalue:"} 
            ], group: "assignGroupKey"},


            {key: "printGroupKey", category: "printGroup", isGroup: true},
            {key: "printFunction",category: "print", type: "print", group: "printGroupKey"},
            {key: "printArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "printGroupKey"},


            {key: "plusGroupKey", category: "plusGroup", isGroup: true},
            {key: "plusFunction",category: "plus", type: "operation", alias: "+", group: "plusGroupKey"},
            {key: "plusArguments", category: "args", items: [ 
              {portId: "lhs:"},
              {portId: "rhs:"} 
            ], group: "plusGroupKey"},


            {key: "varsGroupKey", category: "varsGroup", isGroup: true},
            {key: "varsFunction",category: "vars", type: "vars", group: "varsGroupKey"},
            {key: "varsArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "varsGroupKey"},


            {key: "ifGroupKey", category: "ifGroup", isGroup: true},
            {key: "ifFunction",category: "if", type: "if", group: "ifGroupKey"},
            {key: "ifArguments", category: "args", items: [ 
              {portId: "condition:"},
              {portId: "if_part:"},
              {portId: "else_part:"}, 
            ], group: "ifGroupKey"},


            {key: "whileGroupKey", category: "whileGroup", isGroup: true},
            {key: "whileFunction",category: "while", type: "while", group: "whileGroupKey"},
            {key: "whileArguments", category: "args", items: [ 
              {portId: "condition:"},
              {portId: "if_true_part:"} 
            ], group: "whileGroupKey"},


            {key: "forGroupKey", category: "forGroup", isGroup: true},
            {key: "forFunction",category: "for", type: "for", group: "forGroupKey"},
            {key: "forArguments", category: "args", items: [ 
              {portId: "initialize:"},
              {portId: "condition:"},
              {portId: "update:"},
              {portId: "contains:"},
            ], group: "forGroupKey"},


            { category: "blocks", type: "blocks", items: [ {portId: "1", isportactive: true}, {portId: "2", isportactive: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: "assignFunction", to: "assignArguments"},
            { category: "Reversed", from: "printFunction", to: "printArguments"},
            { category: "Reversed", from: "plusFunction", to: "plusArguments"},
            { category: "Reversed", from: "varsFunction", to: "varsArguments"},
            { category: "Reversed", from: "ifFunction", to: "ifArguments"},
            { category: "Reversed", from: "whileFunction", to: "whileArguments"},
            { category: "Reversed", from: "forFunction", to: "forArguments"},
        ]