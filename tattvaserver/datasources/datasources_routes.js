var datasourcesroutes = require('express').Router();
var bodyParser = require('body-parser');
var JSONparser = bodyParser.json();
var DatasourceSchema = require('./datasource.js');
var NamespaceSchema = require('../namespace/namespaces.js');
var dataProvider = require('../core/datamodelprovider');

datasourcesroutes.get('/edit/:dsourcename', function(req, res) {
  var dsourcename = req.params.dsourcename;
  var DatasourceModel = dataProvider.getModel(DatasourceSchema, req.user.orgsite);
  //console.log(dsourcename);
  var dsdata;
  DatasourceModel.findOne({
    name: dsourcename
  }, function(err, datasourcedata) {
    var namespace = datasourcedata.namespace;
    var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
    //console.log(datasourcedata._id);
    NamespaceModel.findOne({
      name: namespace
    }, function(err, namespacedata) {
      var dsdata = {
        name: datasourcedata.name,
        ipAddress: datasourcedata.ipaddr,
        port: datasourcedata.port,
        description: datasourcedata.description,
        location: datasourcedata.location,
        nspname: namespacedata.name,
        id:datasourcedata._id
      };
      res.send(dsdata);
    });
  });
});

datasourcesroutes.put('/editdialogInstance', function(req, res) {
  //console.log("req.body =    = ", req.body  );
  var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
  NamespaceModel.findOne({
    name: req.body.namespace
  }, function(err, namespacedata) {
    //console.log(namespacedata);
    // var id = namespacedata._id;
    var namespaceName = namespacedata.name;
    var DatasourceModel = dataProvider.getModel(DatasourceSchema, req.user.orgsite);
    DatasourceModel.findOne({
      // nsid:id,
      namespace:namespaceName,
      name: req.body.name,
      ipaddr: req.body.ipAddress,
      port: req.body.port,
      location: req.body.location,
      description: req.body.description
    }, function(err, datasourcedata) {
      //console.log("datasourcedata = ",datasourcedata);
      if (datasourcedata !== null) {
        res.send("No Changes");
      } else {

        var pushdata={
          name: req.body.name,
          // tag: "tag::" + (req.body.location).substring(0, 2) + req.body.port,
          namespace:namespaceName,
          ipaddr: req.body.ipAddress,
          port: req.body.port,
          location: req.body.location,
          description: req.body.description,
          editedBy: req.user.email,
          editedOn: new Date()
        }
        DatasourceModel.update({
          _id: req.body.selectedInstance
        }, pushdata, {}, function(err, updatedObj) {
          if (err) {
            console.error("Error in updating datasource object, error:", err);
          }
          //console.log('Updated Doc = ', updatedObj);
          res.send(updatedObj);
        });
      }
    }); //outer datasource
  }); //outer
});

datasourcesroutes.post('/createdialogInstance', JSONparser, function(req, res) {
  var sourcedata = req.body;
  var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
  NamespaceModel.findOne({
    name: sourcedata.namespace
  }, function(err, namespacedata) {
    if(err){
      console.log("Unable to find namespace '", sourcedata.namespace, "' to which instances was being subscribed, error: ", err);
      res.status(500).json({error:"Invalid namespace or not found..!"});
    }
    var namespaceName = namespacedata.name;
    var obj = {
      name: sourcedata.name,
      orgsite:req.user.orgsite,
      //tag: "tag::" + (sourcedata.location).substring(0, 2) + sourcedata.port,
      namespace: namespaceName,
      ipaddr: sourcedata.ipAddress,
      port: sourcedata.port,
      description: sourcedata.description,
      location: sourcedata.location,
      createdBy: req.user.email,
      createdOn: new Date(),
      editedBy: req.user.email,
      editedOn: new Date()
    };
    var DatasourceModel = dataProvider.getModel(DatasourceSchema, req.user.orgsite);
    DatasourceModel.create(obj, function(err, ddata) {
      if (err) {
        console.log("Failed to save a new datasource, error: ",err);
        res.status(500).json({"error":"Internal error in saving..!"});
      } else {
        //console.log(ddata);
        res.status(200).json(namespacedata);
        // res.send(ddata);
      }
    });
  });
});

datasourcesroutes.get('/:param', function(req, res) {
  var nsp = req.params.param;
  //console.log("--------" + nsp);
  var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
  NamespaceModel.findOne({
    name: nsp
  }, function(err, namespacedata) {
    var namespaceName = namespacedata.name;
    if(err){
      console.log("Unable to find namespace '",nsp, "' of which instances were quaried, error: ", err);
      res.status(500).json({error:"Invalid namespace or not found..!"});
    }
    var DatasourceModel = dataProvider.getModel(DatasourceSchema, req.user.orgsite);
    DatasourceModel.find({
      namespace: namespaceName
    }, function(err, datasourcedata) {
      if(err){
        console.log("Unable to find the instance in ",nsp, " error: ", err);
        res.status(500).json({error: "Failed to find requested data..!"});
      }
      res.send(datasourcedata);
    });
  });
});

datasourcesroutes.get('/', function(req, res) {
  var NamespaceModel = dataProvider.getModel(NamespaceSchema, req.user.orgsite);
  NamespaceModel.find({}, {
    name: 1
  }, function(err, namespacedata) {
    if(err){
      console.log("Namespaces could not be fetched, error: ", err);
      res.status(500).json({error:"Internal error"});
    }
    res.send(namespacedata);
  });
});

module.exports = datasourcesroutes;
