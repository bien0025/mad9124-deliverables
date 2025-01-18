function init() {
    //this function runs after DOMContentLoaded
    let form = document.getElementById('myForm');
    form.addEventListener('submit', handleSubmit);
  }
  
  function handleSubmit(ev) {
    let input;
    input = form.elements.avatarNM;
    input = document.getElementById('avatarID');
    let filelist = input.files;
    //filelist is an array of files.
    if (filelist.length > 0) {
      //at least one file submitted
      let fileOne = filelist[0];
      console.log(fileOne.name);
      console.log(fileOne.type);
      console.log(fileOne.size);
      console.log(fileOne.lastModified);
    }
  }