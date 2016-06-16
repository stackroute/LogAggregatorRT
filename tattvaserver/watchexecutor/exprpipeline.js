var highland = require('highland');

//Mappers
var constMapper = require('./fieldmappers/constantfield');
var accumulatorMapper = require('./fieldmappers/accumulatorfield');
var datafieldMapper = require('./fieldmappers/dataFields');
var functionMapper = require('./fieldmappers/functionfield');
var historicMapper = require('./fieldmappers/historicfield');
var inputMapper = require('./fieldmappers/inputvaluefield');
var constantMapper=require('./fieldmappers/constantfield')
//Operators
var operatorMapper = require('./fieldOperator');

//This builds expression pipeline
var exprPipeline = function(wlstDef) {
  var myProcessors = [];

  //For normalising incoming data
  myProcessors.push(highland.map(function(data) {
    data = JSON.parse(data);
    var execObj={"path":{}, "data":data[2]};
    return execObj;
  }));

  wlstDef.expressions.forEach(function(expr) {
    //LHS
    myProcessors.push(highland.map(function(execObj) {
      //This should be set only for the expression evaluation
      //As a convention we will set it in LHS
      execObj.path[expr.tag] = {};

      execObj.path[expr.tag]['lhs'] = mapExprField(expr.watch.lfield, execObj.data);
      return execObj;
    }));//end of left hand side field

    //RHS
    myProcessors.push(highland.map(function(execObj) {
      execObj.path[expr.tag]['rhs'] = mapExprField(expr.watch.rfield, execObj.data);
      return execObj;
    }));//end of left hand side field

    //Operator
    myProcessors.push(highland.map(function(execObj) {
      execObj.path[expr.tag]['oprtr'] = expr.watch.operator;
      return execObj;
    })); //end of operator

    //Expression Reducer
    myProcessors.push(highland.map(function(execObj) {
      //Reduce the expression by apply operator(lhs, rhs);
      var oprtr = execObj.path[expr.tag]['oprtr'];
      var rhs = execObj.path[expr.tag]['rhs'];
      var lhs = execObj.path[expr.tag]['lhs'];

      var result = operatorMapper.evaluate(oprtr, lhs, rhs);

      //@TODO Highlight match
      //@TODO Output forwarding
      execObj.path[expr.tag]['result'] = result;

      return execObj;
    })); //end of operator
  }); //end of loopig through each expression of the watchlist

  return highland.pipeline.apply(null, myProcessors);
}//end of expression pipeline

//Helper method
function mapExprField(field, dataObj) {
  var result = undefined;

  if (field.fieldType == "DataFields") {
    result = datafieldMapper.map(field, dataObj);
  } else if (field.fieldType == "inputvalue") {
    result = inputMapper.map(field, dataObj);
  } else if (field.fieldType == "constant") {
    result = constantMapper.map(field, dataObj);
  } else if (field.fieldType == "Function") {
    result = functionMapper.map(field, dataObj);
  }  else {
    result = undefined;
  }
  return result;
}

module.exports = exprPipeline;
