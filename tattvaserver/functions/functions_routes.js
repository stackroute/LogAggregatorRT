var express = require('express');
var function_router = express.Router();

var functions = require('./functions.js');

function_router.use(function(req, res, next) {
    //console.log("we reached in the middleware-----------function------------------------------------");
    var func = [{
        "_id" : "function:1",
        "name" : "Sum",
        "description": "This is an invalid function",
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
        "description": "This is an invalid function",
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
        "description": "This is an invalid function",
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
        "description": "This is an invalid function",
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
        "code" : "int Aggr(int x,char y){ return x/y};",
        "createdBy":"Jasjeet",
        "editedBy":"Pooja"
      },
      {
        "_id" : "function:5",
        "name" : "Calculate",
        "description": "This is an invalid function",
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
        "code" : "int Aggr(int x,char y){ return x+y+2};",
        "createdBy":"Jasjeet",
        "editedBy":"Pooja"
      },
      {
        "_id" : "function:6",
        "name" : "Aggregate",
        "description": "This is an invalid function",
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
        "code" : "int Aggr(int x,char y){ return x+y/2};",
        "createdBy":"Jasjeet",
        "editedBy":"Pooja"
      }
    ];

    functions.collection.insert(func,onInsert);

    function onInsert(err, docs) {

      //console.log("in functions");
        if (err) {
            // //console.log(err);
        } else {
            //console.log('%d Sidenav is successfully stored.', docs);
        }
      }
    // var fun1= new functions({
    //   "name": "Aggregate",
    //   "tag":"function:6",
    //   "description": "This is an invalid function",
    //   "fnvartype":[
    //     {
    //     "var":"measures",
    //     "value": true
    //   },
    //   {
    //   "var":"dimension",
    //   "value": true
    //   }],
    //   "variables":"Number x,Number y",
    //   "code" : "int Aggr(int x,char y){ return x+y/2};",
    //   "createdBy":"Jasjeet",
    //   "editedBy":"Pooja"
    // });
    //
    // fun1.save(function (err) {
    //   if (err) {
    //     //console.log(err);
    //     return handleError(err);
    //   }
    // });
    next();
});

// namespace_router.get('/', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
function_router.get('/', function(req, res) {
//console.log("we reached in the route------get-------------------------------------------------------------------------");
  functions.find({},{name:1,description:1},function (err, functionData) {
    res.send(functionData);
  })
});

module.exports = function_router;
