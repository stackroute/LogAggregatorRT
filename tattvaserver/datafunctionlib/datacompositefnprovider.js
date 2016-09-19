var path = require('path');

var tattvaCompositeFunction = function() { 
  var datacompositefnobj = require(path.join(__dirname, "/compositeFunction/compositefunction"));
  return new datacompositefnobj();
}

module.exports = tattvaCompositeFunction;