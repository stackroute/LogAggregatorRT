var watchexecutor_router = require('express').Router();
var watchexecutor = require('./watchexecutor.js');

watchexecutor_router.post('/',function (request, response) {
var watchexecutorObj = request.body;
watchexecutorObj.status="active";
console.log("reached watchlistexecutor with body data");
  watchexecutorObj.id = watchexecutorObj.name;
  var watchexecutor1 = new watchexecutor(watchexecutorObj);
  watchexecutor1.save(function(err, savewatchlistdata){
    if(err) return console.error(err);
  });
});
