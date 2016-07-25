var path = require('path');

var tattvaaggr = function(func) {
  func = func.toLowerCase();
  var aggrobj = require(path.join(__dirname, ("/aggregator/" + func + "-aggregator.js")));
  return new aggrobj();
}

module.exports = tattvaaggr;