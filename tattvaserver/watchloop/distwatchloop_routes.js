var router = require('express').Router();
var request = require('request');
var WatchLoopSchema = require('./watchloop.js');
var WatchListSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');
var appConfig = require('../../config/appconfig');
var logger = require('../../applogger.js');

var saveWatchloopEntries = function(watchLoopEntry, orgsite){
  return new Promise(function(resolve, reject){
    logger.debug("Requested to add a new watchlist to watch loop ", watchLoopEntry.watchname);
    if(watchLoopEntry.watchname === undefined) {
      reject({error:"Error in getting the watchname..!"});
    }

    var WatchListModel = dataProvider.getModel(WatchListSchema, 'Limber');
    WatchListModel.findOne({name:watchLoopEntry.watchname},{}, function(err, watchlist){
      logger.debug("Found a watch list ", watchlist.name);
      var watchLoopEntry = {};
      watchLoopEntry.watchname = watchlist.name;
      watchLoopEntry.orgsite = watchlist.orgsite;
      watchLoopEntry.status = "active";
      watchLoopEntry.execstatus = "created";
      watchLoopEntry.execstartedon = '';

      var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, watchlist.orgsite);
      var watchloopObj = new WatchLoopModel(watchLoopEntry);
      watchloopObj.save(function(err, savedWatchLoopObj) {
        if(err) {
          logger.error("Error occurred in saving watch loop entry for watch list: ", watchlist.name, " error: ", err);
          reject({error:"Internal error in starting with requested watch list execution..!"});
        }
        logger.debug("Successfully added entry to watch loop ", savedWatchLoopObj);
        resolve(savedWatchLoopObj);
      });
    });
  });
};

var editWatchloopEntries = function(watchListEntry, orgsite){
  return new Promise(function(resolve, reject){
    var watchloopObj={};
    var watchname=watchListEntry.name;
    watchloopObj.watchname = watchname;
    watchloopObj.status="active";
    watchloopObj.execstatus = "stopped";
    watchloopObj.execstartedon = '';
    var WatchLoopModel = dataProvider.getModel(WatchLoopSchema, orgsite);
    WatchLoopModel.update({"watchname":watchname}, watchloopObj, function(err, updatedObj) {
      if(err) {
        logger.error("Error in updating: watchlist name: ", watchloopObj.watchname, " error: ", err);
        reject({error:"Internal error in starting with requested watch list execution..!"});
      }
      logger.debug("Successfully update entry to watch loop ", updatedObj);
      resolve(updatedObj);
    });
  });
};

var submitWatchListForExecution = function(watchLoopEntry){
  logger.debug("Submitting watch loop entry: ", watchLoopEntry.watchname, " for distributed execution");
  return new Promise(function(resolve, reject){
    var options = {
      method: 'POST',
      url: 'http://' + appConfig.watchloop.url + '/watchloopservice/watchloop/watchlist/' + watchLoopEntry.orgsite + '/' + watchLoopEntry.watchname
    };

    request(options, function (err, res, body) {
      if (err || res === undefined || res.statusCode === undefined){
        logger.error("Error in submitting watchlist: ",watchLoopEntry.watchname, " for distributed execution, err: ", err);
        reject({error:err});
      } else if(res.statusCode >= 200 && res.statusCode <= 299) {
        logger.debug("Successfully submitted watchlist to distributed service: ",watchLoopEntry.watchname);
        resolve(watchLoopEntry);
      }
    });
  });
};

router.post('/watchloop',function (req, res) {
  saveWatchloopEntries(req.body, req.user.orgsite)
  .then(submitWatchListForExecution)
  .then(function(watchLoopEntry) {
    logger.debug("Successfully submitted watchlist to distributed service response: ", watchLoopEntry);
    return res.status(200).json(watchLoopEntry);
  })
  .catch(function(err) {
    logger.error("Failed to submit new watchlist ", watchLoopEntry.watchname, " to distributed execution service, error", err);
    return res.status(500).json({error: "Internal error..!"});
  });
});

router.put('/watchloop',function (req, res) {
  editWatchloopEntries(req.body, req.user.orgsite)
  .then(submitWatchListForExecution)
  .then(function(watchLoopEntry) {
    logger.debug("Successfully updated watchlist to distributed service response: ", watchLoopEntry);
    return res.status(200).json(watchLoopEntry);
  })
  .catch(function(err) {
    logger.error("Failed to update new watchlist ", watchLoopEntry.watchname, " to distributed execution service, error", err);
    return res.status(500).json({error: "Internal error..!"});
  });
});

module.exports = router;
