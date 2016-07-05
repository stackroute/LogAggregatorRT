const mongoose = require('mongoose');
const logger = require('../../applogger');

function ModelProvider() {
  //To keep the instances of models recently created for a specific database
  modelMap = {};
  //To preserve the connection object and ensure limited number of connections are opened
  dbConnectionMap = {};

  this.getModel = function(schemaObj, dbName) {
    if(!dbName){
      throw new Error("Invalid argument data for establishing connection..!");
    }

    var modelName = schemaObj.get('collection');
    console.log("modelName:",modelName);

    if(!modelName) {
        throw new Error("Invalid data in for establishing source..!");
    }

    var modelObj = getFromMap(dbName, modelName);
    if(!modelObj) {
      var connection = getDBConnection(dbName);
      console.log("Creating new model object for ", dbName, " : ", modelName);
      modelObj = connection.model(modelName, schemaObj);
      pushToMap(dbName, modelName, modelObj);
    }
    return modelObj;
  };

  var getFromMap = function(dbName, modelName) {
    var modelObj = undefined;

    if(modelMap[dbName]) {
      if(modelMap[dbName][modelName]) {
        modelObj = modelMap[dbName][modelName];
      }
    }
    return modelObj;
  };

  var pushToMap = function(dbName, modelName, modelObj) {
    if( ! modelMap[dbName] ) {
      modelMap[dbName] = { modelName: modelObj }
    } else if(modelMap[dbName][modelName]) {
      console.log("Over writing the existing model Obj");
      modelMap[dbName][modelName] = modelObj;
    } else {
      modelMap[dbName][modelName] = modelObj;
    }
  };

  var getDBConnection = function(dbName) {
    var connection = undefined;

    if(dbConnectionMap[dbName]) {
      connection = dbConnectionMap[dbName]
    } else {
      console.log("Creating new connection for ", dbName);
      var dbURI = 'mongodb://localhost/'+dbName;
      connection = mongoose.createConnection(dbURI);
      dbConnectionMap[dbName] = connection;
    }
    return connection;
  };

  process.on('SIGINT', function() {
    console.log("Going to terminate all active connections...!");
    //Destroy all model objects in modelmap
    //Loop through connectionMap and close each connection;
    process.exit(0);
  });
};

var modelprovider = module.exports = exports = new ModelProvider;
