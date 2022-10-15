
    var paletteComps = [  // specify the contents of the Palette

            {key: 1, type: "printGroup", isGroup: true},
            {key: 2,type: "print", group: 1},
            {key: 3, type: "args", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: 1},

            {key: 4, type: "varsDeclGroup", isGroup: true},
            {key: 5, type: "varsDecl", group: 4},
            {key: 6, type: "decl", items: [ 
              {portId: "1:"},
              {portId: "2:"} 
            ], group: 4},

            {key: 7, type: "ifGroup", isGroup: true},
            {key: 8,type: "if", group: 7},
            {key: 9, type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
              {portId: "condition:"},
              {portId: "if_part:", connectedBlock: true},
              {portId: "else_part:"}, 
            ], group: 7},
            {key: 10, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 7},

            {key: 11, type: "whileGroup", isGroup: true},
            {key: 12,type: "while", group: 11},
            {key: 13, type: "args", arity: { "from" : 2 , "to": 2}, items: [ 
              {portId: "condition:"},
              {portId: "if_true_part:", connectedBlock: true} 
            ], group: 11},
            {key: 14, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 11},

            {key: 15, type: "forGroup", isGroup: true},
            {key: 16,type: "for", group: 15},
            {key: 17, type: "args", arity: { "from" : 4 , "to": 4}, items: [ 
              {portId: "initialize:"},
              {portId: "condition:"},
              {portId: "update:"},
              {portId: "contains:"},
            ], group: 15},
            {key: 18, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 15},


            { key: 19, type: "blocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: 2, to: 3},
            { category: "Reversed", from: 5, to: 6},
            { category: "Reversed", from: 8, to: 9},
            { from: 9, to: 10 , fromPort: "if_part:", toPort: "in"},
            { category: "Reversed", from: 12, to: 13},
            { from: 13, to: 14 , fromPort: "if_true_part:", toPort: "in"},
            { category: "Reversed", from: 16, to: 17},
            { from: 17, to: 18 , fromPort: "contains:", toPort: "in"}
        ]

    var paletteComps2 = [

        {key: 20, type: "operatorGroup", isGroup: true},
        {key: 21, type: "operator", alias: "+", group: 20},
        {key: 22, type: "args", arity: { "from" : 2 }, items: [ 
          {portId: "1:"},
          {portId: "2:"} 
        ], group: 20},

        {key: 23, type: "varsReferGroup", isGroup: true},
        {key: 24, type: "varsRefer", group: 23},
        {key: 25, type: "var", items: [ 
          {portId: "1:"}
        ], group: 23}
    ]

    var paletteLinks2 = [
        { category: "Reversed", from: 21, to: 22},
        { category: "Reversed", from: 24, to: 25},
    ]