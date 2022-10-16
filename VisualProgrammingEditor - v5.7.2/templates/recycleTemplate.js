var recycleTemplate = 
    $(go.Part,
        {
            layerName: "Background",
            _viewPosition: new go.Point(50,400)
        },
        {
            mouseDrop: (e, obj) => myDiagram.commandHandler.deleteSelection()
        },
        $(go.Picture,"./images/trash-can.png", {width: 60, height: 60})
    );