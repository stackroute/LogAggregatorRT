var historicQuery_router = require('express').Router();
var historicQuerySchema = require('./historicQuery.js');
var dataProvider = require('../core/datamodelprovider');

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
  historicqueryModel.find({},{name:1, description:1}, function(err, historicfunctionsListData){
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
  historicqueryModel.update({_id:req.body._id}, req.body, {}, function(err, updatedhistoricqueryData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(updatedhistoricqueryData);
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
