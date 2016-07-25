var path = require('path');

accumulatorProvider = function(accumulator) {
  func = func.toLowerCase();
  var acc = require(path.join(__dirname, ("/accumulators/accumulateby" + accumulator)));
  return new acc();
}

module.exports = accumulatorProvider;