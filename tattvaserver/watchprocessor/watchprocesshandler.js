const logger = require('../../applogger');
const request = require('request');
const appConfig = require('../../config/appconfig')

var procRegister = function(myPort){

  var options = {
    method: 'POST',
    url: 'http://' + appConfig.watchloop.url + '/watchloopservice/watchprocessor',
    json: {
      url: ('localhost' + ':' + myPort),
      host: 'localhost',
      port: myPort
    }
  };

  return request(options, function(err, res, body) {
    if (err) {
      logger.error("Error in self registering with watchloop, error: ", err);
      process.exit(1);
    } else {
      if (res === undefined || res.statusCode === undefined) {
        logger.error("Error in self registering with watchloop, returned with out any status");
        process.exit(1);
      } else if (res.statusCode >= 200 && res.statusCode <= 299) {
        logger.info("Successfully registered with watchloop");
      }
    }
  });
}
var procDeRegister = function(myPort){

  console.log("Going to terminate all active connections...!");

  var options = {
    method: 'DELETE',
    url: 'http://' + appConfig.watchloop.url + '/watchloopservice/watchprocessor',
    json: {
      url: ('localhost' + ':' + myPort),
      host: 'localhost',
      port: myPort
    }
  };

  return request(options, function(err, res, body) {
    if (err) {
      console.log("Error in deregistering with watchloop, error: ", err);
      process.exit(1);
    } else {
      if (res === undefined || res.statusCode === undefined) {
        console.log("Error in deregistering with watchloop, returned with out any status");
        process.exit(1);
      } else if (res.statusCode >= 200 && res.statusCode <= 299) {
        console.log("Successfully deregistering with watchloop");
        process.exit(0);
      }
    }
  });
}

module.exports = {
  procRegister: procRegister,
  procDeRegister: procDeRegister
}
