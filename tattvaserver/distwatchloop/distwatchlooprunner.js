var OrganisationSchema = require('../organisation/organisations.js');
var dataProvider = require('../core/datamodelprovider');
var watchloopExecutor=require('./watchloopexecutor');
var watchWorker = require('./watchloopworker');
var processCoordinator = require('./processCoordinator');
var logger = require("../../applogger");

var loopRunner = function() {

  var processorArray=processCoordinator.initializeProcessors();

  var OrganisationModel = dataProvider.getModel(OrganisationSchema,"tattva");

  OrganisationModel.find({}, function(err, orgColln) {
    if(err){
      logger.error("error in finding organisations, error: ", err);
      return;
    }

    logger.debug("Found ", orgColln.length, " organisations in watch loop");
    logger.info("organistations:",orgColln);
    // orgColln.forEach(function(org) {
    //   setImmediate(function(){
    //     watchloopExecutor(org);
    //   });
    // });
  });
}

module.exports = loopRunner;
