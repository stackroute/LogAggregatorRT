 var express = require('express');
 var compositefunction_router = express.Router();
 var compositeFunctionSchema = require('./compositefunction_schema.js');
 var dataProvider = require('../core/datamodelprovider');

 var compositeFunctionProvider = require("../datafunctionlib/datacompositefnprovider");

 compositefunction_router.getFunctionByName = function(name, orgsite, successCallback, errorCallback) {
     var functionModel = dataProvider.getModel(compositeFunctionSchema, orgsite);
     functionModel.find({ name: name }, {}, function(err, res) {
         if (err) {
             return errorCallback(err)
         }
         for (obj in res) {
             return successCallback(res[obj])
         }
     });
 }


 compositefunction_router.get('/:functionName', function(request, res) {
     var functionModel = dataProvider.getModel(compositeFunctionSchema, request.user.orgsite);
     functionModel.findOne({ name: request.params.functionName }, function(err, data) {
         if (err) {
             console.log("Error in find functions, error: ", err);
             res.status(500).json({ error: "Internal error occurred..!" })
         }
         res.send(data);
     });
 });


 compositefunction_router.post('/test', function(request, res) {
    console.log("kritikaroute");
     var compositeFunctionModule = new compositeFunctionProvider();
     var result = compositeFunctionModule.execute(request.body[0], request.body[1]);
     res.send(result);
 });

 compositefunction_router.get('/', function(request, res) {
     var functionModel = dataProvider.getModel(compositeFunctionSchema, request.user.orgsite);
     //console.log(request.user.orgsite);
     functionModel.find({}, function(err, data) {
         if (err) {
             console.log("Error in find functions, error: ", err);
             res.status(500).json({ error: "Internal error occurred..!" })
         }
         res.send(data);
     });
 });

 compositefunction_router.post('/test', function(request, res) {
     var compositeFunctionProvider = require('../datafunctionlib/datacompositefnprovider');
     var compositeFunctionModule = new compositeFunctionProvider();
     var result = compositeFunctionModule.execute(request.body[0], request.body[1]);
     console.log(result.output)
     res.send(result);
 });

 compositefunction_router.get('/', function(request, res) {
     var functionModel = dataProvider.getModel(compositeFunctionSchema, request.user.orgsite);
     functionModel.find({}, { name: 1, parameters: 1, description: 1 }, function(err, data) {
         if (err) {
             console.log("Error in find functions, error: ", err);
             res.status(500).json({ error: "Internal error occurred..!" })
         }
         res.send(data);
     });
 });


 compositefunction_router.post("/:functionName", function(req, res) {
     var functionModel = dataProvider.getModel(compositeFunctionSchema, req.user.orgsite);
     var newfunction = new functionModel(req.body);
     newfunction.save(function(err, savedFunction) {
         if (err) {
             return res.status(400).json(err);
         } else {
             return res.status(200).json(savedFunction);
         }
     });
 });

 module.exports = compositefunction_router;
