var historicQuery_router = require('express').Router();
var historicQuerySchema = require('./historicQuery.js');
var dataProvider = require('../core/datamodelprovider');
var MongoClient = require('mongodb').MongoClient;

historicQuery_router.getQueryByName = function(name,orgsite,successCallback,errorCallback){
  var functionModel = dataProvider.getModel(historicQuerySchema,orgsite);
  functionModel.find({name:name},{}, function(err, res){
    if(err){
      return errorCallback(err)
    }
    for(obj in res){
      return successCallback(res[obj])
    }
  });
}

var findHistoricData = function(db, collnName, skip, timeCriteriaObj, scb, ecb, callback) {
  var queryResult={};
  db.collection(collnName).find(timeCriteriaObj,{ skip: skip, limit: 300 }).toArray(function(err, result) {
    if(result){
      queryResult = result;
      scb(queryResult);
      callback();
    }
    if(err){
      ecb(err);
      callback();
    }
  });
}

historicQuery_router.post('/historicData/:historicDataObj', function (req, res) {
  var url = 'mongodb://localhost:27017/'+req.body.dbName;
  var timeCriteriaObj={};
  if(req.body.inon != undefined){
    timeCriteriaObj['inon'] = {$gte :JSON.stringify(new Date(req.body.inon)).replace('"', '').replace('"', '')};
  }
  MongoClient.connect(url, function(err, db) {
    findHistoricData(db, req.body.collName, req.body.skip, timeCriteriaObj, function(data) {
      return res.status(200).json(data);
    },function(err){
      return res.status(400).json(err);
    },function(){
      db.close();
    });
  });
});

historicQuery_router.post('/historicqueryObjectTest/:queryObject', function (req, res) {
  var historicQueryProvider = require("../datafunctionlib/datahistoricQprovider");
  var historicQueryModule = new historicQueryProvider();
  historicQueryModule.test(req.body, function(queryResult) {
    return res.status(200).json(queryResult);
  },function(err){
    return res.status(400).json(err);
  });
});

historicQuery_router.get('/', function(req, res){
  var historicqueryModel = dataProvider.getModel(historicQuerySchema, req.user.orgsite);
  historicqueryModel.find({}, function(err, historicfunctionsListData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(historicfunctionsListData);
    }
  });
});

historicQuery_router.post('/:historicqueryName', function (req, res) {
  var historicqueryModel = dataProvider.getModel(historicQuerySchema, req.user.orgsite);
  var historicfunctionsObj = req.body;
  historicfunctionsObj.createdBy= req.user.name;
  historicfunctionsObj.createdOn= new Date();
  historicfunctionsObj.editedBy= req.user.name;
  historicfunctionsObj.editedOn= new Date();
  // console.log("reached stream post route to save ", streamObj);
  historicfunctionsObj.orgsite=req.user.orgsite;
  var historicfunctions1 = new historicqueryModel(req.body);
  historicfunctions1.save(function(err, savedhistoricqueryData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(savedhistoricqueryData);
    }
  });
});

historicQuery_router.put('/:historicqueryName',  function (req, res) {
  var historicqueryModel = dataProvider.getModel(historicQuerySchema, req.user.orgsite);
  req.body.editedBy= req.user.name;
  req.body.editedOn= new Date();
  historicqueryModel.update({_id:req.body._id}, req.body, {}, function(err, updatedhistoricqueryData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      //console.log(req.body);
      return res.status(200).json(req.body);
    }
  });
});

historicQuery_router.get('/:historicqueryName', function(req, res){
  var historicqueryModel = dataProvider.getModel(historicQuerySchema, req.user.orgsite);
  historicqueryModel.findOne({name:req.params.historicqueryName}, function(err, historicqueryData){
    if(err){
      console.log("Error in getting historicQueries ", req.params.historicqueryName, " error: ", err);
      //   return res.status(500).json({error:"Intentional error for testing erro scenario"});
      return res.status(500).json(err);
    } else{
      return res.status(200).json(historicqueryData);
    }
  });
});

module.exports = historicQuery_router;
