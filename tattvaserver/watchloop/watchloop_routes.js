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

watchloop_router.post('/',function (request, response) {
  var watchloopObj = request.body;
  console.log("reached watchlist with body data");
  var watchloop1 = new watchloop(watchloopObj);
  watchloop1.save(function(err, savewatchloopdata){
    if(err) return console.error(err);
    console.log(savewatchloopdata);
  });
});


  watchloop_router.put('/:watchlistname',function (request, response) {
  var watchlistObj = request.body;
  var watchloopObj={};
  var o_id = ObjectId(watchlistObj._id);
  watchloopObj.status="active";
  console.log("reached watchlist with body data");
  watchloopObj.watchid = watchlistObj._id;
  watchloopObj.watchname=watchlistObj.name;
  watchloopObj.execstatus="active";
  watchloopObj.execstartedon=Date.now();
  watchloopObj.find({_id: o_id}, function(err, wlist){
    if (err) {
      response.status(500).json({error: "unable to find the required watchlist for saving..!"});
    }
        watchloop.update({"_id":o_id}, watchloopObj, function(err, updatedObj) {
      if(err) {
        console.log("Error in updating: ", watchlistObj._id, " name: ", watchloopObj.name);
        console.error(err);
      }
      console.log("Updated Watchlists ",updatedObj.name);
      response.status(200).json(updatedObj);
    });
  });
});




module.exports = watchloop_router;
