//database publisher
var highland = require('highland');

var streamToMongo = require("stream-to-mongo");

var dbPublisherPipeline = function(wlstDef) {
  var historicDB = wlstDef.orgsite + "_historic";

  var collnName = wlstDef.name;
  collnName = collnName.replace(/\s/g, '_').toLowerCase();
  collnName += "_outcomes";

  var dbServer = 'mongodb://localhost:27017/' + historicDB;

  var saveToDBStream = streamToMongo({db:dbServer, collection:collnName});

  return saveToDBStream;
}

module.exports = dbPublisherPipeline;
