function varArgsStyle() {
  return [
  selectionStyle(), 
  $(go.Panel, "Vertical", {name: "ARGS"},
      new go.Binding("itemArray", "items"),
      {itemTemplate: varArgTemplate}
  )
  ]
}

function varArgStyle() {
  return [
    $(go.Shape, { fill: argFixedColor }),
    selectableArgStyle("Var"),
    {
      click: (e, obj) => {
        onArgClick(e, obj, settingsAdornmentMap["VAR ARGUMENT"]);
      }
    }
  ]
  }