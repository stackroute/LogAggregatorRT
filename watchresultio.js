var io = require('socket.io')();

io.on('connection', function(socket) {
	console.log('a new client socket connected ');

	socket.on('join:room', function(data) {
		console.log("New client is joining: ", data.room);
		socket.join(data.room);
	});

	socket.on('watchlist:onResult', function(data) {
		io.to(data.room).emit('room:message', {'room':data.room, 'message':data.message});
		console.log("New message to room: ", data);
		socket.to(data.room).emit('watchlist:getdata', {'room':data.room, 'message':data.message});
	});
});

module.exports = io;
