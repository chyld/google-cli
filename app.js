var google = require('./google');
var cp = require('child_process');
var prompt = require('prompt');
var colors = require('colors');

prompt.start();

prompt.get(['search'], function (err, result){
  google.search(result.search, 50, 0, function(anchors){
    for(var i = 0; i < anchors.length; i++){
      console.log(i + ' : ' + anchors[i].text.bold);
    }

    prompt.get(['number'], function(err, results){

      var cmd = 'open ' + anchors[results.number].url;
      cp.exec(cmd);
    });
  });
});
