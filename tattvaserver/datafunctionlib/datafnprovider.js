var path = require('path');

var tattva = function(func) {
  func = func.toLowerCase();
  var fnobj = require(path.join(__dirname, ("/primitives/" + func)));
  return new fnobj();
}

module.exports = tattva;