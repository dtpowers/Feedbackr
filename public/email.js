
var globalFiles;

handleFiles = function(files){
  console.log("reached this function");
  console.log("file is: " + files);
  globalFiles = files;
  Papa.parse(globalFiles[0], {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            data = results;
        }
    });
  // console.log();

  // parsed = Papa.parseFiles(file);
  // console.log("parsed is:" + parsed);
  // rows = parsed.data;
  // console.log("rows is:" + rows);
}



