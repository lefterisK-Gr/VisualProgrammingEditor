var recycleTemplate = 
    $(go.Node, "Auto",
        {
            portId: "to", deletable: false,
            layerName: "Background", locationSpot: go.Spot.Center
        },
        {
            mouseDrop: (e, obj) => myDiagram.commandHandler.deleteSelection()
        },
        $(go.Picture,"./images/trash-can.png", {width: 60, height: 60})
    );