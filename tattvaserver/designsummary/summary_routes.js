var asyncModel = require('async');
var summary_router = require('express').Router();
var StreamSchema = require('../datastream/stream.js');
var NamespaceSchema = require('../namespace/namespaces.js');
var DatasourceSchema = require('../datasources/datasource.js');
var WatchlistSchema = require('../watchlists/watchlists.js');
var dataProvider = require('../core/datamodelprovider');

var summaryStats = [];
summary_router.get('/',function(req, res, next){

  asyncModel.parallel( [

    function namespace(callback){
      var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
      NamespaceModel.count(function(err,count){
        callback(null,{name:"namespace", value: count});
      })
    },

    function datasource(callback){
      var DatasourceModel = dataProvider.getModel(DatasourceSchema, req.user.orgsite);
      DatasourceModel.count(function(err,count){
        callback(null,{name:"datasource", value: count});
      });
    },

    function stream(callback){
      var StreamModel = dataProvider.getModel(StreamSchema, req.user.orgsite);
      StreamModel.count(function(err,count){
        callback(null, {name:"streams", value: count});
      });
    },


    function watchlist(callback){
      var WatchlistModel = dataProvider.getModel(WatchlistSchema, req.user.orgsite);
      WatchlistModel.count(function(err,count){
        callback(null,{name:"watchlist", value: count});
      });
    },

    function runningWatchlist(callback){
      var WatchlistModel = dataProvider.getModel(WatchlistSchema, req.user.orgsite);
      WatchlistModel.find({},function(err,data){
        var count=0;
        for(i in data){
          if(data[i].status === 'active'){
            count++;
          }
        }
         callback(null,{name:"actvwatchlist", value: count});
      });
    }
    //
    // StreamModel.count(function(err,count){
    //   //console.log("----------------------------------------------------------------",data);
    //   summaryStats.push({name:"namespace", value: count});
    // });

  ],
  function(err,summeryStats){
    //console.log("Hello",summeryStats);
    res.status(200).json(summeryStats);
  });
});

module.exports = summary_router;
