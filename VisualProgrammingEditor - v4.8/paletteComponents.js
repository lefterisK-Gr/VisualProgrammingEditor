
    var paletteComps = [  // specify the contents of the Palette
            //{category: "args", items: [ {portId: "lvalue"}, {portId: "rvalue"} ]},

            {key: "assignGroupKey", category: "assignGroup", isGroup: true},
            {key: "assignFunction",category: "assign", type: "function",  group: "assignGroupKey"},
            {key: "assignArguments", category: "args", items: [ 
              {portId: "lvalue:", type: "argument"},
              {portId: "rvalue:", type: "argument"} 
            ], group: "assignGroupKey"},


            {key: "printGroupKey", category: "printGroup", isGroup: true},
            {key: "printFunction",category: "print", type: "function", group: "printGroupKey"},
            {key: "printArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "printGroupKey"},


            {key: "plusGroupKey", category: "plusGroup", isGroup: true},
            {key: "plusFunction",category: "plus", type: "addition", group: "plusGroupKey"},
            {key: "plusArguments", category: "args", items: [ 
              {portId: "lhs:", type: "argument"},
              {portId: "rhs:", type: "argument"} 
            ], group: "plusGroupKey"},


            {key: "varsGroupKey", category: "varsGroup", isGroup: true},
            {key: "varsFunction",category: "vars", type: "function", group: "varsGroupKey"},
            {key: "varsArguments", category: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: "varsGroupKey"},


            {key: "ifGroupKey", category: "ifGroup", isGroup: true},
            {key: "ifFunction",category: "if", type: "function", group: "ifGroupKey"},
            {key: "ifArguments", category: "args", items: [ 
              {portId: "condition:"},
              {portId: "if_part:"},
              {portId: "else_part:"}, 
            ], group: "ifGroupKey"},


            {key: "whileGroupKey", category: "whileGroup", isGroup: true},
            {key: "whileFunction",category: "while", type: "function", group: "whileGroupKey"},
            {key: "whileArguments", category: "args", items: [ 
              {portId: "condition:"},
              {portId: "if_true_part:"} 
            ], group: "whileGroupKey"},


            {key: "forGroupKey", category: "forGroup", isGroup: true},
            {key: "forFunction",category: "for", type: "function", group: "forGroupKey"},
            {key: "forArguments", category: "args", items: [ 
              {portId: "initialize:"},
              {portId: "condition:"},
              {portId: "update:"},
              {portId: "contains:"},
            ], group: "forGroupKey"},


            { category: "blocks", items: [ {portId: "1"}, {portId: "2"} ]}
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