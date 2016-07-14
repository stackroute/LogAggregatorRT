var watchloop_router = require('express').Router();
// var mongoose = require( 'mongoose' );
var WatchLoopSchema = require('./watchloop.js');
var WatchListSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');
// var watchloopExecutor = require('./watchlooprunner.js')
var watchExecutor = require('../watchexecutor/watchlistexecutor');

// var ObjectId = mongoose.Types.ObjectId;

watchloop_router.post('/',function (request, response) {
  var watchloopObj = request.body;
  // var o_id;
  var dataSource = {
    ipaddr: '172.23.238.251',
    port: '7070'
  };
  var WatchListModel = dataProvider.getModel(WatchListSchema, request.user.orgsite);
  WatchListModel.findOne({name:watchloopObj.watchname},{}, function(err, watchlist){
    watchloopObj.watchname=watchlist.name;
    watchloopObj.orgsite=request.user.orgsite;
    var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, request.user.orgsite);
    var watchloop1 = new WatchLoopModel(watchloopObj);
    watchloop1.save(function(err, savewatchloopdata){
      if(err) {
        console.log("Error occurred in saving watch loop entry for watch list: ", watchlist.name);
        return response.status(500).json({error:"Internal error in startign with requested watch list execution..!"});
      }

      console.log("Starting execution of ", watchlist.name);
      //this is object
        watchExecutor(watchlist, dataSource);
      //Execute the watch list using Watch list executor
      return response.json(savewatchloopdata);
    });
  })
});

watchloop_router.put('/',function (request, response) {
  var watchlistObj = request.body;
  var watchloopObj={};
  // var o_id = ObjectId(watchlistObj._id);
  var watchname=watchlistObj.name;
  watchloopObj.status="active";
  watchloopObj.watchname = watchname;
  watchloopObj.execstatus="active";
  watchloopObj.execstartedon=Date.now();
  // watchloop.find({_id: o_id}, function(err, wlist){
  // //   if (err) {
  //     response.status(500).json({error: "unable to find the required watchlist for saving..!"});
  //   }
  var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, request.user.orgsite);
        WatchLoopModel.update({"watchname":watchname}, watchloopObj, function(err, updatedObj) {
      if(err) {
        console.log("Error in updating: watchlist name: ", watchloopObj.name, " error: ", err);
        return response.status(500).json({error: "Internal error occurred..!"});
      }
      return response.status(200).json(updatedObj);
    });
  // });
});

module.exports = watchloop_router;
