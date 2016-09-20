
var globalFiles;

handleFiles = function(files){
  console.log("reached this function");
  console.log("files are: " + files);
  globalFiles = files;
  Papa.parse(globalFiles[0], {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            data = results.data;
            $.ajax({
				        type: "GET",
				        url: "/dummy",
				        data: "",
				        success: function() {
				            console.log("ajax request sent");
				        }
				    })
        }
    });
  // console.log();

  // parsed = Papa.parseFiles(file);
  // console.log("parsed is:" + parsed);
  // rows = parsed.data;
  // console.log("rows is:" + rows);
}



