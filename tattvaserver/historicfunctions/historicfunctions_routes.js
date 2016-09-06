var historicfunctions_router = require('express').Router();
var historicfunctionsSchema = require('./historicfunctions.js');
var dataProvider = require('../core/datamodelprovider');

historicfunctions_router.get('/', function(req, res){
  var historicfunctionsModel = dataProvider.getModel(historicfunctionsSchema, req.user.orgsite);
  historicfunctionsModel.find({},{name:1, description:1}, function(err, historicfunctionsListData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(historicfunctionsListData);
    }
  });
});

historicfunctions_router.post('/:historicfunctionsName', function (req, res) {
  var historicfunctionsModel = dataProvider.getModel(historicfunctionsSchema, req.user.orgsite);
  var historicfunctionsObj = req.body;
  // console.log("reached stream post route to save ", streamObj);
  historicfunctionsObj.orgsite=req.user.orgsite;
  var historicfunctions1 = new historicfunctionsModel(req.body);
  historicfunctions1.save(function(err, savedhistoricfunctionsData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(savedhistoricfunctionsData);
    }
  });
});

historicfunctions_router.put('/:historicfunctionsName',  function (req, res) {
  var historicfunctionsModel = dataProvider.getModel(historicfunctionsSchema, req.user.orgsite);
  historicfunctionsModel.update({_id:req.body._id}, req.body, {}, function(err, updatedhistoricfunctionsData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json(updatedhistoricfunctionsData);
    }
  });
});

historicfunctions_router.get('/:historicfunctionsName', function(req, res){
  var historicfunctionsModel = dataProvider.getModel(historicfunctionsSchema, req.user.orgsite);
  historicfunctionsModel.findOne({name:req.params.historicfunctionsName}, function(err, historicfunctionsData){
    if(err){
      console.log("Error in getting historicfunctions ", req.params.historicfunctionsName, " error: ", err);
      //   return res.status(500).json({error:"Intentional error for testing erro scenario"});
      return res.status(500).json(err);
    } else{
      return res.status(200).json(historicfunctionsData);
    }
  });
});

module.exports = historicfunctions_router;
