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