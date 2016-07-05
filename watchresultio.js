var io = require('socket.io')();

io.on('connection', function(socket) {

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
module.exports = io;
