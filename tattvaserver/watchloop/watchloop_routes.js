var watchloop_router = require('express').Router();
var mongoose = require( 'mongoose' );
var watchloop = require('./watchloop.js');
var watchlist = require('../watchlists/watchlists.js');
// var watchloopExecutor = require('./watchlooprunner.js')
var watchExecutor = require ('../watchexecutor/watchlistexecutor');

var ObjectId = mongoose.Types.ObjectId;
watchloop_router.get('/',function (request, response) {
next();
});

watchloop_router.post('/',function (request, response) {
  var watchloopObj = request.body;
  var o_id;
  var dataSource = {
    ipaddr: '172.23.238.253',
    port: '7070'
  };

  watchlist.findOne({name:watchloopObj.watchname},{}, function(err, watchloopId){
    console.log("** watchlist id to be looped", watchloopId);
    o_id = ObjectId(watchloopId._id);
    console.log("this is id"+o_id);
    watchloopObj.watchid=o_id;
    var watchloop1 = new watchloop(watchloopObj);
    watchloop1.save(function(err, savewatchloopdata){
      if(err) return console.error(err);
      console.log("Starting execution");
      //this is object
        watchExecutor(watchloopId, dataSource);
      //Execute the watch list using Watch list executor
    });
  })
});


  watchloop_router.put('/',function (request, response) {
  var watchlistObj = request.body;
  var watchloopObj={};
  var o_id = ObjectId(watchlistObj._id);
  watchloopObj.status="active";
  watchloopObj.watchid = o_id;
  watchloopObj.watchname=watchlistObj.name;
  watchloopObj.execstatus="active";
  watchloopObj.execstartedon=Date.now();
  // watchloop.find({_id: o_id}, function(err, wlist){
  // //   if (err) {
  //     response.status(500).json({error: "unable to find the required watchlist for saving..!"});
  //   }
        watchloop.update({"watchid":o_id}, watchloopObj, function(err, updatedObj) {
      if(err) {
        console.log("Error in updating: ", watchlistObj._id, " name: ", watchloopObj.name);
        console.error(err);
        response.status(400).json(err);
      }
      response.status(200).json(updatedObj);
    });
  // });
});




module.exports = watchloop_router;
