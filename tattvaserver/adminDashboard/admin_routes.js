var asyncRunner = require('async');
var dataModelProvider = require('../core/datamodelprovider');
var admin_routes = require('express').Router();

var UserSchema = require('../organisation/users.js');
var OrgSchema = require('../organisation/organisations.js');
var namespaceSchema = require('../namespace/namespaces.js');
var DatasourceSchema = require('../datasources/datasource.js');
var StreamSchema = require('../datastream/stream.js');
var watchListSchema = require('../watchlists/watchlists.js');

admin_routes.get('/',function(req,res){
  var OrgModel  = dataModelProvider.getModel(OrgSchema,"tattva");
  var tattvaChildren = [];
  var namespaces = [];
  var datasources = [];
  var streams = [];
  var watchLists = [];
  OrgModel.find({},function(err,organisations){
      if(err){
        console.log("error in getting orgs for graph data");
        res.status(500).json("error in getting graph data:orgs");
      }
      // console.log(organisations);
      for(var i=0;i<organisations.length;i++){
        var orgobj = {
          name : organisations[i].orgSite,
          orgSite : organisations[i].orgSite,
          level : 2,
          instanceType : "organization",
          children : []
        };
        tattvaChildren.push(orgobj);
      }
        // console.log(organisations[i]);
      for(var i=0;i<tattvaChildren.length;i++){
        // console.log("loop val:",i);
      asyncRunner.parallel(
        [
        function namespace(callback){
          console.log("namespaces query");
          var NamespaceModel = dataModelProvider.getModel(namespaceSchema, organisations[i].orgSite);
          NamespaceModel.find({},function(err,allnamespaces){
            if(err){
              console.log("error in getting namespaces for graph data error:",err);
              res.status(500).json("error in getting namespaces for graph data");
            }
            // console.log("allnamespaces /n",allnamespaces);
            // namespaces = allnamespaces;
            callback(null,{"namespaces":allnamespaces});
          });
        },
        function instance(callback){
          console.log("instances query");
          console.log('datasource querry');
          var DatasourceModel = dataModelProvider.getModel(DatasourceSchema, organisations[i].orgSite);
          DatasourceModel.find({},function(err,allDatasources){
            if(err){
              console.log("error in getting datasources for graph data error:",error);
              res.status(500).json("error in getting datasources for graph data");
            }
            // datasources = allDatasources;
            callback(null,{"datasources":allDatasources});
          });
        },
        function stream(callback){
          console.log("streams query");
          var StreamModel = dataModelProvider.getModel(StreamSchema, organisations[i].orgSite);
          StreamModel.find({},function(err,allStreams){
            if(err){
              console.log("error in getting datasources for graph data error:",error);
              res.status(500).json("error in getting datasources for graph data");
            }
            // streams = allStreams;
            callback(null,{"streams":allStreams});
          });
        },
        function watchlist(callback){
          console.log("watchlist query");
          var WatchlistModel = dataModelProvider.getModel(watchListSchema, organisations[i].orgSite);
          WatchlistModel.find({},function(err,allWatchlists){
            if(err){
              console.log("error in getting datasources for graph data error:",error);
              res.status(500).json("error in getting datasources for graph data");
            }
            // watchlists = allWatchlists;
            callback(null,{"watchlists":allWatchlists});
          });
        }
      ],function(err,allchildren){
          if(err){
            console.log("error in getting sunburst graph data error:",err);
            res.status(500).json("error in getting sunburst graph data error");
          }
          // console.log("tattvaChildren",tattvaChildren);
          console.log("i",i);
          // console.log("current org before namespace addition",tattvaChildren[i]);

          //add namespaces to resulutant json
          for(var j=0;j<allchildren.namespaces;j++){
            var namespaceobj = {
                name : allchildren.namespaces[j].name,
                orgSite : organisations[i].orgSite,
                level : 3,
                instanceType : "namespace",
                children : []
            };
            // console.log("namesoace object");
            tattvaChildren[i].children.push(namespaceobj);
          }
          // console.log("current org after namespace addition:",tattvaChildren[i]);

          //add instances to resulutant json
          for(var j=0;j<allchildren.datasources;j++){
            var ownerNamespace =  allchildren.datasources[j].namespace;
            for(var k=0;k<tattvaChildren.children.length;k++){
              //loop for namespace
              if(ownerNamespace == obj.children[k].name){
                var datasourceobj = {
                  name : allchildren.datasources[j].name,
                  orgSite : organisations[i].orgSite,
                  level : 4,
                  instanceType : "instance",
                  children : []
                };
                tattvaChildren.children[k].children.push(namespaceobj);
              }
            }
          }

          //add streams to resultant json
          for(var j=0;j<allchildren.streams;j++){
            var ownerNamespace = allchildren.streams[j].namespace;
            var ownerDatasource = allchildren.streams[j].instance;
            for(k=0;k<tattvaChildren.children.length;k++){
              //loop for namespace
              if(ownerNamespace == tattvaChildren.children[k]){
                for(l=0;l<tattvaChildren.children[k].children.length;l++){
                  //loop for datasource
                  if(ownerDatasource = tattvaChildren.children[k].children[l]){
                    var streamsobj = {
                      name : allchildren.streams[j].name,
                      orgSite : organisations[i].orgSite,
                      level : 5,
                      instanceType : "stream",
                      children : []
                    };
                    tattvaChildren.children[k].children[l].children.push(streamsobj);
                  }
                }
              }
            }
          }

          //add watchlist to resultant json
          for(var j=0;j<allchildren.watchlists;j++){
            var ownerNamespace = allchildren.watchlists[j].namespace;
            var ownerStream = allchildren.watchlists[j].stream;
            for(k=0;k<tattvaChildren.children.length;k++){
              //loop for namespace
              if(ownerNamespace == tattvaChildren.children[k]){
                for(l=0;l<tattvaChildren.children[k].children.length;l++){
                  //loop for datasource
                  for(m=0;m<tattvaChildren.children[k].children[l].chlidren.length;l++){
                    //loop for stream
                    if(ownerDatasource = tattvaChildren.children[k].children[l].children[m]){
                    var streamsobj = {
                      name : allchildren.wactchlists[j].name,
                      orgSite : organisations[i].orgSite,
                      level : 6,
                      instanceType : "watchlist",
                      children : []
                    };
                    tattvaChildren.children[k].children[l].children[m].children.push(streamsobj);
                  }
                }
              }
            }
          }
        }
        // console.log(" tattvaChildren ",tattvaChildren);
        // res.send(tattvaChildren);
    });
  }
})
});
admin_routes.get('/appPortfolio',function(req,res){
  var orgModel = dataModelProvider.getModel(OrgSchema,"tattva");
  orgModel.find({},function(err,data){
    if(err){
      console.log("AppPortfolio get request error:",err);
      res.status(500).json("Internal error occurred");
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
      res.status(500).json("Internal Server Error");
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
          res.status(500).json("error in getting namespaces for orgSite");
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
          res.status(500).json("error in getting datasources for orgSite")
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
          res.status(500).json("error in getting streams for orgSite:")
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
          res.status(500).json("error in getting watchlists for orgSite")
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
        res.status(500).json("error in getting summery stats for orgSite")
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
      res.status(500).json("error in getting recent activity for organisation");
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
      res.status(500).json("error in getting orgLogo for organisation");
    }
    console.log("Org Contact Info",Org[0]);
    res.send(Org[0]);
  })
});

module.exports = admin_routes;
