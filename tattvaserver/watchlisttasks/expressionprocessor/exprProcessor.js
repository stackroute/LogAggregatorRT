//Mappers
var constMapper = require('../../watchexecutor/fieldmappers/constantfield');
var accumulatorMapper = require('../../watchexecutor/fieldmappers/accumulatorfield');
var datafieldMapper = require('../../watchexecutor/fieldmappers/dataFields');
var functionMapper = require('../../watchexecutor/fieldmappers/functionfield');
var compositeFunctionMapper = require('../../watchexecutor/fieldmappers/compositefunctionfield');
var historicMapper = require('../../watchexecutor/fieldmappers/historicfield');
var inputMapper = require('../../watchexecutor/fieldmappers/inputvaluefield');
var constantMapper = require('../../watchexecutor/fieldmappers/constantfield');
//Operators
var operatorMapper = require('../../watchexecutor/fieldOperator');

var logger = require('../../../applogger');

var exprProcessor = function(expr, execObj) {
  // logger.debug("Processing expression: ", expr, " with data: ", execObj);
  //process a expression
  var lhs = mapExprField(expr.watch.lfield, execObj.data);
  var rhs = mapExprField(expr.watch.rfield, execObj.data);
  var oprtr = expr.watch.operator;
  var result = operatorMapper.evaluate(oprtr, lhs, rhs);

  //@TODO Highlight match
  //@TODO Output forwarding
  //@TODO Adding back result to data as a field
  execObj.path[expr.tag] = {};
  execObj.path[expr.tag]['lhs'] = lhs;
  execObj.path[expr.tag]['rhs'] = rhs;
  execObj.path[expr.tag]['oprtr'] = oprtr;
  execObj.path[expr.tag]['result'] = result;
  // console.log("LHS:",lhs);
  // console.log("LHS:",oprtr);
  // console.log("LHS:",rhs);
  // console.log("LHS:",result);

  return execObj;
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
  } else if (field.fieldType == "compositefunction") {
    result = compositeFunctionMapper.map(field, dataObj);
  } else if (field.fieldType == "Accumulate") {
    result = accumulatorMapper.map(field, dataObj);
  } else {
    result = undefined;
  }
  return result;
}

module.exports = {
  processExpression: exprProcessor
};