var datasourcesroutes = require('express').Router();
var bodyParser = require('body-parser');
var JSONparser = bodyParser.json();
var datasource = require('./datasource.js');
var namespace = require('../namespace/namespaces.js');

datasourcesroutes.get('/edit/:dsourcename', function(req, res) {
    var dsourcename = req.params.dsourcename;
    //console.log(dsourcename);
    var dsdata
    datasource.findOne({
        name: dsourcename
    }, function(err, datasourcedata) {
        var id = datasourcedata.nsid;
        //console.log(datasourcedata._id);
        namespace.findOne({
            _id: id
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
    namespace.findOne({
        name: req.body.namespace
    }, function(err, namespacedata) {
      //console.log(namespacedata);
        var id = namespacedata._id;
        datasource.findOne({
          nsid:id,
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
                                tag: "tag::" + (req.body.location).substring(0, 2) + req.body.port,
                                nsid:id,
                                ipaddr: req.body.ipAddress,
                                port: req.body.port,
                                location: req.body.location,
                                description: req.body.description,
                                editedBy: "pooja singh"
                              }
                                datasource.update({
                                    _id: req.body.selectedInstance
                                }, pushdata, {}, function(err, updatedObj) {
                                    if (err) {
                                        console.error(err);
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
    namespace.findOne({
        name: sourcedata.namespace
    }, function(err, namespacedata) {
      if(err){
        console.log("Unable to find namespace '", sourcedata.namespace, "' to which instances was being subscribed, error: ", err);
        res.status(500).json({error:"Invalid namespace or not found..!"});
      }
        var refid = namespacedata._id;
        var obj = {
            name: sourcedata.name,
            //tag: "tag::" + (sourcedata.location).substring(0, 2) + sourcedata.port,
            nsid: refid,
            ipaddr: sourcedata.ipAddress,
            port: sourcedata.port,
            description: sourcedata.description,
            location: sourcedata.location,
            createdBy: "pooja singh",
            editedBy: "pooja singh"
        };
        datasource.create(obj, function(err, ddata) {
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
    namespace.findOne({
        name: nsp
    }, function(err, namespacedata) {
        var refid = namespacedata._id;
        if(err){
          console.log("Unable to find namespace '",nsp, "' of which instances were quaried, error: ", err);
          res.status(500).json({error:"Invalid namespace or not found..!"});
        }
        datasource.find({
            nsid: refid
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
    namespace.find({}, {
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
