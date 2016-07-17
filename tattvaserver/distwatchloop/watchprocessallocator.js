var logger = require('../../applogger');

var nextAvailableProcessor = function() {
  var processorMap = [];

  processorMap.push({
    url: '127.0.0.1:8091',
    ip: '127.0.0.1',
    port: '8091'
  }, {
    url: '127.0.0.1:8092',
    ip: '127.0.0.1',
    port: '8092'
  });

  //Randomly pick one item
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  randomIndex = getRandomInt(0, 2);
  var processorObj = processorMap[randomIndex];

  return processorObj;
}

module.exports = {
  getNextAvailableProcessor: nextAvailableProcessor
}