var express = require('express');
var function_router = express.Router();

var FunctionSchema = require('./functions.js');
var dataProvider = require('../core/datamodelprovider');

// namespace_router.get('/', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
// function_router.get('/', function(req, res) {
//   var FunctionModel = dataProvider.getModel(FunctionSchema, req.user.orgsite);
// //console.log("we reached in the route------get-------------------------------------------------------------------------");
//   FunctionModel.find({},{name:1,description:1},function (err, functionData) {
//     res.send(functionData);
//   })
// });

function_router.get('/', function(req, res) {
  var functionData = [{
      "_id" : "function:1",
      "name" : "Sum",
      "description": "Adds two variables",
      "type": "aggregate",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Aggr(int x,char y){ return x+y};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:2",
      "name" : "Subtract",
      "type": "primitive",
      "description": "Subtract one variable from another",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Sub(int x,char y){ return x-y};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:3",
      "name" : "Multiply",
      "type": "primitive",
      "description": "Multiply two varibles",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Mul(int x,char y){ return x*y};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:4",
      "name" : "Divide",
      "type": "primitive",
      "description": "Divide two variables",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Divide(int x,char y){ return x/y};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:5",
      "name" : "max",
      "type": "aggregate",
      "description": "maximum of variables",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Maximum(data){ return Max(data)};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:6",
      "name" : "min",
      "type": "aggregate",
      "description": "minimum of  variables",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Minimum(data){ return Min(data)};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:7",
      "name" : "average",
      "type": "aggregate",
      "description": "Average of variables",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int Average(data){ return Avg(data)};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    },
    {
      "_id" : "function:8",
      "name" : "count",
      "type": "aggregate",
      "description": "Count of variables",
      "fnvartype":[
      {
        "var":"measures",
        "value": true
      },
      {
        "var":"dimension",
        "value": true
      }],
      "variables":"Number x,Number y",
      "code" : "int count(data){ return count(data)};",
      "createdBy":"Jasjeet",
      "editedBy":"Pooja"
    }





  ];
  return res.send(functionData);
});

module.exports = function_router;
