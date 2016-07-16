var logger = require('../../applogger');

var nextAvailableProcessor = function () {
  var processorMap = [];

  processorMap.push({
    url: '127.0.0.1:8091',
    ip: '127.0.0.1',
    port: '8091'
  }, {
    url: '127.0.0.1:8092',
    ip: '127.0.0.1',
    port: '8092'
  },{
    url: '127.0.0.1:8093',
    ip: '127.0.0.1',
    port: '8093'
  },{
    url: '127.0.0.1:8094',
    ip: '127.0.0.1',
    port: '8094'
  },{
    url: '127.0.0.1:8095',
    ip: '127.0.0.1',
    port: '8095'
  });

  //Randomly pick one item
  function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min)) + min;
  }
  randomIndex = getRandomInt(0,4);
  var processorObj = processorMap[randomIndex];

  return processorObj;
}

module.exports = {
  getNextAvailableProcessor: nextAvailableProcessor
}
