
var globalFiles;

handleFiles = function(files){
  console.log("files are: " + files);
  globalFiles = files;
  Papa.parse(globalFiles[0], {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
        		console.log("parsed results successfully");
            data = results.data;
            $.ajax({
				        type: 'GET',
				        contentType: 'application/json',
				        dataType: 'json',
				        cache: 'false',
				        url: "/dummy",
				        data: {"email": "suvrathpen@gmail.com"},
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



