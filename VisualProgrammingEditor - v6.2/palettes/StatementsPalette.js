var paletteComps = [  // specify the contents of the Palette

            {key: 1, type: "printGroup", isGroup: true},
            {key: 2, type: "print", group: 1, loc: "0 0"},
            {key: 3, type: "args", items: [ 
              {portId: "1"}, //remove portId, just args_via_object
              {portId: "2"} 
            ], group: 1, loc: "100 0"},

            {key: 4, type: "varsDeclGroup", isGroup: true},
            {key: 5, type: "varsDecl", group: 4},
            {key: 6, type: "decl", items: [ 
              {portId: "1"},
              {portId: "2"} 
            ], group: 4},

            {key: 7, type: "ifGroup", isGroup: true},
            {key: 8, type: "if", group: 7},
            {key: 9, type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
              {portId: "condition"},
              {portId: "if_part", connectedBlock: true},
              {portId: "else_part", connectedBlock: true}, 
            ], group: 7},
            {key: 10, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 7},
            {key: 11, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 7},

            {key: 12, type: "whileGroup", isGroup: true},
            {key: 13, type: "while", group: 12},
            {key: 14, type: "args", arity: { "from" : 2 , "to": 2}, items: [ 
              {portId: "condition"},
              {portId: "if_true_part", connectedBlock: true} 
            ], group: 12},
            {key: 15, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 12},

            {key: 16, type: "forGroup", isGroup: true},
            {key: 17, type: "for", group: 16},
            {key: 18, type: "args", arity: { "from" : 4 , "to": 4}, items: [ 
              {portId: "initialize"},
              {portId: "condition"},
              {portId: "update"},
              {portId: "contains"},
            ], group: 16},
            {key: 19, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 16},

            { key: 20, type: "breakGroup", isGroup: true },
            { key: 21, type: "break", group: 20 },

            { key: 22, type: "continueGroup", isGroup: true },
            { key: 23, type: "continue", group: 22 },

            { key: 24, type: "blocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: 2, to: 3},
            { category: "Reversed", from: 5, to: 6},
            { category: "Reversed", from: 8, to: 9},
            { from: 9, to: 10 , fromPort: "if_part", toPort: "in"},
            { from: 9, to: 11 , fromPort: "else_part", toPort: "in"},
            { category: "Reversed", from: 13, to: 14},
            { from: 14, to: 15 , fromPort: "if_true_part", toPort: "in"},
            { category: "Reversed", from: 17, to: 18},
            { from: 18, to: 19 , fromPort: "contains", toPort: "in"}
        ]