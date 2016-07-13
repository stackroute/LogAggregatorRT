var asyncRunner = require('async');
var dataModelProvider = require('../core/datamodelprovider');
var admin_routes = require('express').Router();

var UserSchema = require('../organisation/users.js');
var OrgSchema = require('../organisation/organisations.js');
var namespaceSchema = require('../namespace/namespaces.js');
var DatasourceSchema = require('../datasources/datasource.js');
var StreamSchema = require('../datastream/stream.js');
var watchListSchema = require('../watchlists/watchlists.js');

admin_routes.get('/appPortfolio',function(req,res){
  var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
  orgModel.find({},function(err,data){
    if(err){
      console.log("AppPortfolio get request error:",err);
      res.status(500).json({error:"Internal error occurred"});
    }
    return res.send(data);
  })
});

admin_routes.get('/getWatchlists/:orgSite',function(req,res){
  console.log("params to getWatchlist:",req.params.orgSite);
  var orgSites = [];
  var data = [];
  if(req.params.orgSite!="tattva"){
    watchesForOrg(req.params.orgSite);
  }
  function watchesForOrg(orgSite){
  var watchModel = dataModelProvider.getModel(watchListSchema,orgSite);
  watchModel.find({},function(err,data){
    if(err){
      console.log("Watchlists get request error for "+orgSite+" error:",err);
      res.status(500).json({error:"Internal Server Error"});
      }
    return res.send(data);
    })
  }
});

admin_routes.get('/getOrganisationInfo/:orgSite',function(req,res){
  console.log("params to getOrgInfo:",req.params);
  var orgStats = {};

  asyncRunner.parallel([
    function namespaceCount(callback) {
      console.log("namespace querry");
      var NamespaceModel = dataModelProvider.getModel(namespaceSchema, req.params.orgSite);
      NamespaceModel.count(function(err,count){
        if(err){
          console.log("Error in namespace query module error:",err);
          res.status(500).json({error:"error in getting namespaces for orgSite:",orgSite})
        }
        callback(null,{name:"namespace", value: count});
        orgStats["namespaces"] = count;
      })
    },

    function datasourceCount(callback){
      console.log('datasource querry');
      var DatasourceModel = dataModelProvider.getModel(DatasourceSchema, req.params.orgSite);
      DatasourceModel.count(function(err,count){
        if(err){
          console.log("Error in datasource query module error:",err);
          res.status(500).json({error:"error in getting datasources for orgSite:",orgSite})
        }
        orgStats["datasources"] = count;
        callback(null,{name:"datasource", value: count});
      })
    },

    function streamCount(callback){
      console.log("stream query");
      var StreamModel = dataModelProvider.getModel(StreamSchema, req.params.orgSite);
      StreamModel.count(function(err,count){
        if(err){
          console.log("Error in stream query module error:",err);
          res.status(500).json({error:"error in getting streams for orgSite:",orgSite})
        }
        orgStats["streams"] = count;
        callback(null, {name:"streams", value: count});
      })
    },

    function watchlistCount(callback){
      console.log("watchlists query");
      var WatchlistModel = dataModelProvider.getModel(watchListSchema, req.params.orgSite);
      WatchlistModel.count(function(err,count){
        if(err){
          console.log("Error in watchlist query module error:",err);
          res.status(500).json({error:"error in getting watchlists for orgSite:",orgSite})
        }
        orgStats["watchlists"] = count;
        callback(null,{name:"watchlist", value: count});
      })
    },
  ],

    function(err,summeryStats){
      console.log("inside orgInfo Callback");
      if(err){
        console.log("Error in callback module error:",err);
        res.status(500).json({error:"error in getting summery stats for orgSite:",orgSite})
      }
    console.log('orgStats contents',orgStats);
    res.json(orgStats);
    });
});

admin_routes.get('/getOrgActivity/:orgSite',function(req,res){
  console.log("org activity query for ",req.params.orgSite);
  var watchModel = dataModelProvider.getModel(watchListSchema,req.params.orgSite);
  var recentActivity = [];
  watchModel.find({},null,{sort:{"editedOn":-1}},function(err,activity){
    if(err){
      console.log("Error in getting org recent activity");
      res.status(500).json({error:"error in getting recent activity for organisation:"+req.params.orgSite});
    }
    console.log('activity',activity);
    res.send(activity);
  })
});

admin_routes.get('/getorgContactInfo/:orgSite',function(req,res){
  var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
  var ContactInfo = [];
  orgModel.find({orgSite : req.params.orgSite},function(err,Org){
    if(err){
      console.log("error in getting org contact info");
      res.status(500).json({error:"error in getting orgLogo for organisation:"+req.params.orgSite});
    }
    console.log("Org Contact Info",Org[0]);
    res.send(Org[0]);
  })
});

module.exports = admin_routes;
