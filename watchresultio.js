var io = require('socket.io')();
var redis = require('redis');

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

var redisClient = redis.createClient();

io.on('connection', function(socket) {
	console.log("subscribing to client");
	redisClient.subscribe('watchlist:onResultPublish');

	redisClient.on('message', function(channel, chDataStr) {
		var chData = JSON.parse(chDataStr);
		// console.log("Got message from channel ", channel, " data is: ", chData);
		// console.log("data1:",data[0].logdata);
		var eventName = 'watchlist::onResult' + '::' + chData.channel;
		var eventData = {'logdata': chData.logdata, 'watchresult': chData.watchresult};

		io.emit(eventName, eventData);
	});
});

module.exports = io;
