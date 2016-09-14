var path = require('path');

var tattvaCompositeFunction = function(func) {
  func = func.toLowerCase();
  var fnobj = require(path.join(__dirname, ("/compositeFunction/compositeFunction.js")));
  return new fnobj();
}

module.exports = tattvaCompositeFunction;