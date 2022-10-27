
    var paletteComps = [  // specify the contents of the Palette

            {key: 1, type: "printGroup", isGroup: true},
            {key: 2,type: "print", group: 1},
            {key: 3, type: "args", items: [ 
              {portId: "1"},
              {portId: "2"} 
            ], group: 1},

            {key: 4, type: "varsDeclGroup", isGroup: true},
            {key: 5, type: "varsDecl", group: 4},
            {key: 6, type: "decl", items: [ 
              {portId: "1"},
              {portId: "2"} 
            ], group: 4},

            {key: 7, type: "ifGroup", isGroup: true},
            {key: 8,type: "if", group: 7},
            {key: 9, type: "args", arity: { "from" : 2 , "to": 3}, items: [ 
              {portId: "condition"},
              {portId: "if_part", connectedBlock: true},
              {portId: "else_part"}, 
            ], group: 7},
            {key: 10, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 7},

            {key: 11, type: "whileGroup", isGroup: true},
            {key: 12,type: "while", group: 11},
            {key: 13, type: "args", arity: { "from" : 2 , "to": 2}, items: [ 
              {portId: "condition"},
              {portId: "if_true_part", connectedBlock: true} 
            ], group: 11},
            {key: 14, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 11},

            {key: 15, type: "forGroup", isGroup: true},
            {key: 16,type: "for", group: 15},
            {key: 17, type: "args", arity: { "from" : 4 , "to": 4}, items: [ 
              {portId: "initialize"},
              {portId: "condition"},
              {portId: "update"},
              {portId: "contains"},
            ], group: 15},
            {key: 18, type: "funBlocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} 
            ], group: 15},


            { key: 19, type: "blocks", items: [ {portId: "1", isport: true}, {portId: "2", isport: true} ]}
        ]

    var paletteLinks = [
            { category: "Reversed", from: 2, to: 3},
            { category: "Reversed", from: 5, to: 6},
            { category: "Reversed", from: 8, to: 9},
            { from: 9, to: 10 , fromPort: "if_part", toPort: "in"},
            { category: "Reversed", from: 12, to: 13},
            { from: 13, to: 14 , fromPort: "if_true_part", toPort: "in"},
            { category: "Reversed", from: 16, to: 17},
            { from: 17, to: 18 , fromPort: "contains", toPort: "in"}
        ]

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
        {key: 28, type: "args", arity: { "from" : 2 }, items: [ 
          {portId: "1"},
          {portId: "2"} 
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
        {key: 37, type: "var", arity: { "from" : 1, "to": 1 }, items: [ 
          {portId: "1"}
        ], group: 35},

        {key: 38, type: "objectGroup", isGroup: true},
        {key: 39, type: "object", group: 38},
        {key: 40, type: "decl", items: [ 
          {portId: "1"},
          {portId: "2"}
        ], group: 38}
    ]

    var paletteLinks2 = [
        { category: "Reversed", from: 21, to: 22},
        { category: "Reversed", from: 24, to: 25},
        { category: "Reversed", from: 27, to: 28},
        { category: "Reversed", from: 30, to: 31},
        { category: "Reversed", from: 33, to: 34},
        { category: "Reversed", from: 36, to: 37},
        { category: "Reversed", from: 39, to: 40},
    ]