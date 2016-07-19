var distwatchloop_router = require('express').Router();
var disExecuteWatchList = require('./watchlistexecutor');
var WatchListSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');
var watchExecutor = require('./watchlistexecutor');
var watchProcStore = require('./watchprocessstore');
var logger = require('../../applogger.js');

distwatchloop_router.post('/watchlist/:orgsite/:watchlistname', function(req, res) {
  var watchlistName = req.params.watchlistname;
  var orgSite = req.params.orgsite;

  logger.debug("watchlist execution request from webapp for ", watchlistName);

  if (watchlistName === undefined || orgSite === undefined) {
    res.status(400).json({
      error: "Invalid request, one or more required request data not found..!"
    });
  }

  var WatchListModel = dataProvider.getModel(WatchListSchema, orgSite);
  WatchListModel.findOne({name: watchlistName}, function(err, wlstDef){
    if(err){
      logger.error("Error in finding watchlist model,error: ", err);
      return res.status(500).json({error:"Internal error in executing distributed watchlist..!"})
    }

    if(!wlstDef) {
      logger.error("Specified watch list not found for execution ", watchlistName, " of organisation ", orgSite);
      return res.status(500).json({error:"Internal error in executing distributed watchlist..!"})
    }

    setImmediate(function(){
      logger.debug("Starting distributed watch list execution for watch list ", wlstDef.name);
      watchExecutor.executeWatchList(wlstDef);
      logger.debug("Don starting distributed watch list execution for watch list ", wlstDef.name);
    })
  });

  res.status(200).json({
    status: 'success'
  })
});

distwatchloop_router.get('/watchprocessors', function(req, res) {
  watchProcStore.getWatchProcessorMap(function(procMap){
    // logger.debug("Processor map from router ", procMap);
    return res.status(200).json(procMap);
  });

  //
  //
  // return new Promise(function(resolve,reject){
  //   return watchProcStore.getWatchProcessorMap(function(processorObj){
  //     return resolve(processorObj);
  //   });
  // }).then(function(processorObj){
  //   logger.debug("successfully retrieved watch processor map",processorObj);
  //   return res.status(200).json(processorObj);
  // },function(err){
  //   logger.error("Failed to fetch processor map, error", err);
  //   return res.status(500).json({error: "Internal error..!"});
  // })
});

module.exports = distwatchloop_router;
