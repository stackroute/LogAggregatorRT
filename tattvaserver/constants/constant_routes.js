var express = require('express');
var constant_router = express.Router();
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
  return res.send(constantData);
});

constant_router.post("/addconstant", function(req,res){
  var newconstant = req.body;
  //@TODO save to DB
  return res.send("Constant created successfully");
});

module.exports = constant_router;
