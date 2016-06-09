var watchloop_router = require('express').Router();
var mongoose = require( 'mongoose' );
var watchloop = require('./watchloop.js');

watchloop_router.get('/',function (request, response) {
  console.log("inside watchloop_router");
  var watchloopObj = request.body;
  watchloopObj.status="active";
  console.log("reached watchlistexecutor with body data");
  watchloopObj.id = watchloopObj.name;
  var watchloop1 = new watchloop(watchloopObj);
  watchloop1.save(function(err, savewatchlistdata){
    if(err) return console.error(err);
  });
});
module.exports = watchloop_router;
