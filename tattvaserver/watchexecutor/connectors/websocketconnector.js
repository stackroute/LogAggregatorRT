var websocket = require('websocket-stream');

module.exports = function(ipaddr, port) {
  var wsstream = websocket('ws://' + ipaddr + ':' + port);
  return wsstream;
}
