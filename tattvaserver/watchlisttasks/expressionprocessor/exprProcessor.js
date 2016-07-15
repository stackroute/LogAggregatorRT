//Mappers
var constMapper = require('../../fieldmappers/constantfield');
var accumulatorMapper = require('../..fieldmappers/accumulatorfield');
var datafieldMapper = require('../../fieldmappers/dataFields');
var functionMapper = require('../../fieldmappers/functionfield');
var historicMapper = require('../../fieldmappers/historicfield');
var inputMapper = require('../../fieldmappers/inputvaluefield');
var constantMapper=require('../../fieldmappers/constantfield')
//Operators
var operatorMapper = require('./fieldOperator');

var exprProcessor = function() {

  this.processExpression = function(expr, execObj) {
    //process a expression
    var lhs = mapExprField(expr.watch.lfield, execObj.data);
    var rhs = mapExprField(expr.watch.rfield, execObj.data);
    var oprtr = expr.watch.operator;
    var result = operatorMapper.evaluate(oprtr, lhs, rhs);

    //@TODO Highlight match
    //@TODO Output forwarding
    execObj.path[expr.tag] = {};
    execObj.path[expr.tag]['lhs'] = lhs;
    execObj.path[expr.tag]['rhs'] = rhs;
    execObj.path[expr.tag]['oprtr'] = oprtr;
    execObj.path[expr.tag]['result'] = result;
  }
};

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
  } else if (field.fieldType == "Accumulator") {
    result = accumulatorMapper.map(field, dataObj);
  } else {
    result = undefined;
  }
  return result;
}

module.exports = exprProcessor;
