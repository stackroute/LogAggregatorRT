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
  var organisations = [];
  var namespaces = [];
  var datasources = [];
  var streams = [];
  var watchLists = [];
  OrgModel.find({},function(err,orgs){

    if(err){
      console.log("error in getting orgs for graph data");
      res.status(500).json({error:"error in getting graph data:orgs"});
    }

    for(var i=0;i<orgs.length;i++){
      var orgobj = {
        name : orgs[i].orgName,
        orgSite : orgs[i].orgSite,
        level : 2,
        instanceType : "organization",
        children : []
      };
      organisations.push(orgobj);
    }

    var ns=function namespace(orgsite, callback){
      // console.log("namespaces query for org: ", orgsite, " at ", index);
      var NamespaceModel = dataModelProvider.getModel(namespaceSchema, orgsite);
      NamespaceModel.find({},{_id: 0, name: 1, orgsite: 1},function(err,allnamespaces){
        if(err){
          console.log("error in getting namespaces for graph data error:",err);
          res.status(500).json({error:"error in getting namespaces for graph data"});
        }
        // console.log(allnamespaces[0]);
        callback(null,{"namespaces":allnamespaces});
      });
    };

    var ds = function datasource(orgsite, callback){
      console.log('datasource querry');
      var DatasourceModel = dataModelProvider.getModel(DatasourceSchema,orgsite);
      DatasourceModel.find({},{_id: 0, name: 1, orgsite: 1, namespace: 1},function(err,allDatasources){
        if(err){
          console.log("error in getting datasources for graph data error:",error);
          res.status(500).json({error:"error in getting datasources for graph data"});
        }

        callback(null,{"datasources":allDatasources});
      });
    };

    var sm = function stream(orgsite, callback){
      console.log("streams query");
      var StreamModel = dataModelProvider.getModel(StreamSchema, orgsite);
      StreamModel.find({},{_id:0,streamname:1,orgsite:1,namespace:1,instance:1},function(err,allStreams){
        if(err){
          console.log("error in getting datasources for graph data error:",error);
          res.status(500).json({error:"error in getting datasources for graph data"});
        }
        callback(null,{"streams":allStreams});
      });
    };

    var wt = function watchlist(orgsite, callback){
      console.log("watchlist query");
      var WatchlistModel = dataModelProvider.getModel(watchListSchema,orgsite);
      WatchlistModel.find({},{_id:0,name:1,orgsite:1,namespace:1,stream:1},function(err,allWatchlists){
        if(err){
          console.log("error in getting datasources for graph data error:",error);
          res.status(500).json({error:"error in getting datasources for graph data"});
        }
        callback(null,{"watchlists":allWatchlists});
      });
    };

    var organisationTasks = organisations.map(function(organisationItem) {
      return function(callback){
      asyncRunner.parallel([
        ns.bind(null,organisationItem.orgSite),
        ds.bind(null,organisationItem.orgSite),
        sm.bind(null,organisationItem.orgSite),
        wt.bind(null,organisationItem.orgSite)
      ],function(err,allchildren){
        var arr = [];
          // console.log("allchildren in callback: ", JSON.stringify(allchildren));

          // add namespaces to resulutant json
          for(var j = 0; j<allchildren[0].namespaces.length; j++){
            // console.log("Type of the data ", (typeof (allchildren[0].namespaces[j])));
            var namespaceobj = JSON.parse(JSON.stringify(allchildren[0].namespaces[j]));
            namespaceobj["instanceType"] = "namespace";
            namespaceobj["level"] = 3;
            namespaceobj["children"] = [];
            namespaceobj["orgwatchcount"] = allchildren[3].watchlists.length;
            // console.log("Pushing ", j, "th obj ", namespaceobj, " at indenx: ", allchildren[0].index);
            arr.push(namespaceobj);
          }
          // console.log("current org after namespace addition:",arr);

          for(var j = 0; j<allchildren[1].datasources.length; j++){
            // creating the datasource object
            var datasourcesobj = JSON.parse(JSON.stringify(allchildren[1].datasources[j]));
            datasourcesobj["instanceType"] = "datasource";
            datasourcesobj["level"] = 4;
            datasourcesobj["children"] = [];
            datasourcesobj["orgwatchcount"] = allchildren[3].watchlists.length;
            //finding the namespace to put in the datasource Object
            for(var k=0;k<arr.length;k++){
              var currentNamespace = arr[k];
              if(datasourcesobj.namespace === currentNamespace.name){
                // currentNamespace.children.push();
                arr[k].children.push(datasourcesobj);
              }
            }
          }
          // console.log("current org after datasources addition:",arr);

          //streams
          for(var j = 0; j<allchildren[2].streams.length; j++){
            // creating the datasource object
            var streamsobj = JSON.parse(JSON.stringify(allchildren[2].streams[j]));
            streamsobj["instanceType"] = "stream";
            streamsobj["level"] = 5;
            streamsobj["children"] = [];
            streamsobj["orgwatchcount"] = allchildren[3].watchlists.length;

            //finding the namespace and datasource to put in the streams Object
            for(var k=0;k<arr.length;k++){
              var currentNamespace = arr[k];
              for(var l=0;l<currentNamespace.children.length;l++){
                // var currentdatasource = currentNamespace.children[l];
                if(currentNamespace.name === streamsobj.namespace){
                    arr[k].children[l].children.push(streamsobj);
                }
              }
            }
          }
          // console.log("current org after streams addition:",arr);

          //watchlists
          for(var j = 0; j<allchildren[3].watchlists.length; j++){
            // creating the datasource object
            var watchlistsobj = JSON.parse(JSON.stringify(allchildren[3].watchlists[j]));
            watchlistsobj["instanceType"] = "watchlist";
            watchlistsobj["level"] = 6;
            watchlistsobj["children"] = [];
            watchlistsobj["orgwatchcount"] = allchildren[3].watchlists.length;
            // console.log("watchlistsobj:",watchlistsobj);

            //finding the namespace, datasource and stream to put in the streams Object
            for(var k=0;k<arr.length;k++){
              var currentNamespace = arr[k];
              // console.log("currentNamespace.children.length",currentNamespace.children.length);

              for(var l=0;l<currentNamespace.children.length;l++){
                var currentdatasource = currentNamespace.children[l];
                // console.log("currentdatasource.children.length",currentdatasource.children.length);

                for(var m=0;m<currentdatasource.children.length;m++){
                  var currentstream = currentdatasource.children[m];
                  // console.log("owner stream:",currentstream);
                  // console.log("currentNamespace.name",currentNamespace.name,"watchlistsobj.namespace",watchlistsobj.namespace,"currentstream.name",currentstream.name,"watchlistsobj.stream",watchlistsobj.stream);
                  if(currentNamespace.name == watchlistsobj.namespace && currentstream.streamname == watchlistsobj.stream){
                      arr[k].children[l].children[m].children.push(watchlistsobj);
                    }
                  }
                }
              }
            }
            organisationItem["orgwatchcount"] = allchildren[3].watchlists.length;
            organisationItem.children = arr;
            return callback(null, organisationItem);
        });
      }
    });

    asyncRunner.parallel(organisationTasks, function(err, response) {
      var tattva = {
        name : "tattva",
        instanceType : "super User",
        level : 1,
        children : response
      };
      console.log("******************************tattva********************************");
      console.log(JSON.stringify(tattva));
      res.status(200).json(tattva);
        });
  });
});

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
