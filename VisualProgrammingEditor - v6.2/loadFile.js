let upload = document.getElementById('upload');

upload.addEventListener('change', ()=>{
  // Initiallize file reader
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);
  fr.onload = function(){
    myDiagram.model = go.Model.fromJson(fr.result);
    save();
    load();
  };
});