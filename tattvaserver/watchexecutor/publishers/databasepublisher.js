//database publisher
var highland = require('highland');

var streamToMongo = require("stream-to-mongo");

var dbPublisherPipeline = function(wlstDef) {
  var historicDB = wlstDef.orgsite + "_historic";

  var collnName = wlstDef.name;
  collnName = collnName.replace(" ").toLowerCase();
  collnName += "_outcomes";

  var saveToDBStream = streamToMongo({db: 'mongodb://localhost:27017/test3', collection:collnName});

  return saveToDBStream;
}

module.exports = dbPublisherPipeline;
