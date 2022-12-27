let upload = document.getElementById('upload');

upload.addEventListener('change', ()=>{
  // Initiallize file reader
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);
  fr.onload = function(){
    console.log(fr.result)
    myDiagram.model = go.Model.fromJson(fr.result);
    console.log(myDiagram.model)
    save();
    load();
  };
});