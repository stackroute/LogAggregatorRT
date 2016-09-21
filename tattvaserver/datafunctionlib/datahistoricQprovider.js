var path = require('path');

var tattvaHistoricQuery = function() { 
  var dataHistoricQueryObj = require(path.join(__dirname, "/historicQuery/historicQuery.js"));
  return new dataHistoricQueryObj();
}

module.exports = tattvaHistoricQuery;