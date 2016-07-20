var io = require('socket.io')();
var redis = require('redis');
var appConfig = require('./config/appconfig');
var logger = require('./applogger');

/*io.on('connection', function(socket) {

	// socket.on('join:room', function(data) {
	// 	console.log("New client is joining: ", data.room);
	// 	socket.join(data.room);
	// });
	//
	// socket.on('leave:room',function(data){
	// 	console.log("Client is leaving",data.room);
	// 	socket.leave(data.room);
	// });

	socket.on('watchlist:onResultPublish', function(data) {
		// io.to(data.room).emit('room:message', {'room':data.room, 'message':data.message});
		// socket.to(data.room.name).emit('watchlist::graphdata', {'room':data.room, 'message':data.message.graphdata});
		// socket.to(data.room.name).emit('watchlist::logdata', {'room':data.room, 'message':data.message.logdata});
		var eventName = 'watchlist::onResult' + '::' + data.channel;
		var eventData = {'logdata': data.logdata, 'watchresult': data.watchresult};
		io.emit(eventName, eventData);
	});
});
*/

var redisClient = undefined;

var admClient = undefined;

io.on('connection', function(socket) {
  console.log("subscribing to client");

  socket.on('subscribe::adminevents', function(data) {
    if (!admClient) {
      admClient = redis.createClient({
        host: appConfig.redis.host,
        port: appConfig.redis.port
      });
    }

    admClient.subscribe('watchloop::onWatchProcessorJoin');
    admClient.subscribe('watchloop::onWatchProcessorLeave');
    admClient.subscribe('watchloop::onWatchListJoin');

    admClient.on('message', function(channel, chDataStr) {
      chData = JSON.parse(chDataStr);

      logger.debug("Got admin event message from ", channel, " data: ", chData);

      adminEventData = {
        channel: channel,
        data: chData
      };

      socket.emit('watchloop::onAdminEvent', adminEventData);
    });
  });

  if (!redisClient) {
    redisClient = redis.createClient({
      host: appConfig.redis.host,
      port: appConfig.redis.port
    });
  }


  redisClient.subscribe('watchlist:onResultPublish');
  redisClient.on('message', function(channel, chDataStr) {
    var chData = JSON.parse(chDataStr);
    // console.log("Got message from channel ", channel, " data is: ", chData);
    // console.log("data1:",data[0].logdata);
    var eventName = 'watchlist::onResult' + '::' + chData.channel;
    var eventData = {
      'logdata': chData.logdata,
      'watchresult': chData.watchresult
    };

    socket.emit(eventName, eventData);
  });

  socket.on('disconnect', function() {
    if (redisClient) {
      redisClient.unsubscribe();
      redisClient.quit();
      redisClient = undefined;
    }

    if (admClient) {
      admClient.unsubscribe();
      admClient.quit();
      admClient = undefined;
    }
  });
});

module.exports = io;