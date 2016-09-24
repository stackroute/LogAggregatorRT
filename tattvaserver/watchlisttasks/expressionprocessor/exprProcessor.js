//Mappers
var constMapper = require('../../watchexecutor/fieldmappers/constantfield');
var accumulatorMapper = require('../../watchexecutor/fieldmappers/accumulatorfield');
var datafieldMapper = require('../../watchexecutor/fieldmappers/dataFields');
var functionMapper = require('../../watchexecutor/fieldmappers/functionfield');
var compositeFunctionMapper = require('../../watchexecutor/fieldmappers/compositefunctionfield');
var historicMapper = require('../../watchexecutor/fieldmappers/historicfield');
var inputMapper = require('../../watchexecutor/fieldmappers/inputvaluefield');
var constantMapper = require('../../watchexecutor/fieldmappers/constantfield');
var prevExprResultMapper = require('../../watchexecutor/fieldmappers/prevexprresultfield');

//Operators
var operatorMapper = require('../../watchexecutor/fieldOperator');

var logger = require('../../../applogger');

var exprProcessor = function(expr, requiredObject, histQResult, execObj) {
  // logger.debug("Processing expression: ", expr, " with data: ", execObj);
  //process a expression
  var lhs = mapExprField(expr.watch.lfield, requiredObject, histQResult, execObj.data, execObj);
  var rhs = mapExprField(expr.watch.rfield, requiredObject, histQResult, execObj.data, execObj);
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

  return execObj;
};

function mapExprField(field, requiredObject, histQResult, dataObj, execObj) {
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
    result = compositeFunctionMapper.map(field, requiredObject, dataObj);
  } else if (field.fieldType == "Accumulate") {
    result = accumulatorMapper.map(field, dataObj);
  } else if (field.fieldType == "historicData") {
    for (i in histQResult) {
      result = histQResult[i];
    }
  } else if (field.fieldType == "PrevExprResult") {
    result = prevExprResultMapper.map(field, execObj, dataObj);
  } else {
    result = undefined;
  }
  return result;
}

module.exports = {
  processExpression: exprProcessor
};
