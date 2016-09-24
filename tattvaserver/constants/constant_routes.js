var constant_router = require('express').Router();
var constantSchema = require('./constant_schema.js');

var dataProvider = require('../core/datamodelprovider');

constant_router.get('/', function(req, res) {
  var constantData=[
  {
    "con_name": "Archimedes' constant π",
    "value": "3.14",
    "Descr": "Circumference of a disk with unit diameter."
  },
  {
    "con_name": "Ramanujan constant K",
    "value": "0.76",
    "Descr": "This is an valid function"
  },
  {
    "con_name": "Omega Constant Ω",
    "value": "0.567",
    "Descr": "This article is about the Ω constant from analysis"
  },
  {
    "con_name": "Euler's number e",
    "value": "2.74",
    "Descr": "Base of natural logarithms. "
  },
  {
    "con_name": "The golden ratio φ",
    "value": "1.618033988749894848204586",
    "Descr": " Diagonal of a unit-side pentagon."
  },
  {
    "con_name": "Pythagora's constant √2",
    "value": "1.414",
    "Descr": "Diagonal of a square with unit side. "
  }
  ];

  var constantModel = dataProvider.getModel(constantSchema, req.user.orgsite);
  constantModel.find({}, function(err, constantListData){
    if(err){
      return res.status(400).json(err);
    }
    else{
      for(constant in constantListData){
        constantData.push(constantListData[constant]);
      }
      return res.status(200).json(constantData);
    }
  });
});

constant_router.post("/addconstant", function(req,res){
  var constantModel = dataProvider.getModel(constantSchema, req.user.orgsite);
  var constantObj = req.body;
  // console.log("reached stream post route to save ", streamObj);
  constantObj.orgsite=req.user.orgsite;
  var constant1 = new constantModel(req.body);
  constant1.save(function(err, savedConstant){
    if(err){
      return res.status(400).json(err);
    }
    else{
      return res.status(200).json("Constant created successfully");
    }
  });
});

module.exports = constant_router;
