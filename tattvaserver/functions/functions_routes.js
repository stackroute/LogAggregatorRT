var express = require('express');
var function_router = express.Router();

var functions = require('./functions.js');

function_router.use(function(req, res, next) {
    console.log("we reached in the middleware-----------------------------------------------");
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
    //     console.log(err);
    //     return handleError(err);
    //   }
    // });
    next();
});

// namespace_router.get('/', function(req, res) {
//     res.send('hello ' + req.params.name + '!');
// });
function_router.get('/', function(req, res) {
console.log("we reached in the route-------------------------------------------------------------------------------");
  functions.find({},{name:1,description:1},function (err, functionData) {
    res.send(functionData);
  })
});

module.exports = function_router;
