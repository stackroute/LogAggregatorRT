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
  if(req.params.orgSite==="tattva"){
    var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
    orgModel.find({},function(err,orgs){
      for(var i=0;i<orgs.length;i++){
        orgSites.push(orgs[i].orgSite);
      }
      console.log("orgs:",orgSites);
      for(orgSite in orgSites){
        watchesForOrg(req.params.orgSite);
      }
    })
  }
  else{
    // data.push(watchesForOrg(req.params.orgSite));
    watchesForOrg(req.params.orgSite);
    // console.log("data: ",data);
  }
  function watchesForOrg(orgSite){
  var watchModel = dataModelProvider.getModel(watchListSchema,orgSite);
  watchModel.find({},function(err,data){
    if(err){
      console.log("Watchlists get request error for "+orgSite+" error:",err);
      res.status(500).json({error:"Internal Server Error"});
      }
    // console.log("watchInfo:",watchInfo);
    return res.send(data);
    // return watchInfo;
    })
  }
});

admin_routes.get('/getOrgInfo/:orgSite',function(req,res){
  console.log("params to getOrgInfo:",req.params);
  // console.log(req.params.orgSite,"===",req.user.orgSite,"=",req.params.orgSite===req.user.orgSite);
  var orgStats = {};

  asyncRunner.parallel([
    function namespace(callback) {
      // console.log("namespace querry");
      console.log("req.user.orgSite:",req.user.orgsite);
      console.log("req.params.orgSite:",req.params.orgSite);
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

    function datasource(callback){
      // console.log('datasource querry');
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

    function stream(callback){
      // console.log("stream query");
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

    function watchlist(callback){
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

    function contactInfo(callback){
      console.log("contact query");
      // console.log("userModel:",req.params.orgSite);
      var userModel = dataModelProvider.getModel(UserSchema,"tattva");
      userModel.find({orgsite:req.params.orgSite},function(err,orgUser){
        if(err){
          console.log("Error in contactInfo module",err);
          res.status(500).json({error:"error in getting userInfo for organisation:",orgSite});
        }
        // console.log("orgUser:",orgUser);
        orgStats["ContactName"] = orgUser[0].name;
        orgStats["ContactEmail"] = orgUser[0].email;
        callback(null,{ContactName:orgUser[0].name,ContactEmail : orgUser[0].email});
      });
    },

    function orgLogo(callback){
      console.log("orglogo query for ",req.params.orgSite);
      var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
      orgModel.find({orgSite : req.params.orgSite},function(err,Org){
        // orgStats["orgLogo"] = Org[0].orgSite;
        if(err){
          console.log("error in orglogo query");
          res.status(500).json({error:"error in getting orgLogo for organisation:",orgSite});
        }
        // console.log("org:\n",Org);
        orgStats[orgLogo] = Org[0].orgLogo;
        callback(null,{orgLogo:Org[0].orgLogo});
      })
    }

  ],

    function(err,summeryStats){
      console.log("inside Calback");
      if(err){
        console.log("Error in callback module error:",err);
        res.status(500).json({error:"error in getting summery stats for orgSite:",orgSite})
      }
    console.log('orgStats contents',orgStats);
    res.json(orgStats);
    });
});

module.exports = admin_routes;
