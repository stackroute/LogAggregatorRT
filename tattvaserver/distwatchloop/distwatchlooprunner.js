var OrganisationSchema = require('../organisation/organisations.js');
var dataProvider = require('../core/datamodelprovider');

var orgwatchlooprunner = require('./orgwatchlooprunner');

var logger = require('../../applogger');
var appConfig = require('../../config/appconfig');

var loopRunner = function() {
  var OrganisationModel = dataProvider.getModel(OrganisationSchema, appConfig.masterdb);

  OrganisationModel.find({orgName: { $ne: appConfig.masterdb }}, function(err, orgColln) {
    if(err){
      logger.error("Error in finding organisations, error: ", err);
      logger.error("Aborting watch loop");
      return;
    }

    logger.debug("Found ", orgColln.length, " organisations for running watch loop");

    orgColln.forEach(function(org) {
      setImmediate(function(){
        logger.debug("Starting watch loop bootstrapping for organisation ", org.orgSite);
        orgwatchlooprunner.bootWatchLists(org);
        logger.debug("Done bootstrapping watch loop for organisation ", org.orgSite);
      });
    });
  });
}

module.exports = loopRunner;
