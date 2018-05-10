

io.on('connection', function(socket){

	socket.on('chat message', function(data){
		io.emit('new message', {msg: data, id: socket.username});


		console.log(data)


	});
});

io.sockets.on('connection', function (socket) {
	socket.on('add user', (username)=>{



		socket.username = username

		socket.room = 'room1';
		usernames[username] = username;

		socket.join('room1')

		socket.emit('updatechat', 'SERVER', 'you have connected to room1');

		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});
});
socket.on('switchRoom', function(newroom){

	socket.leave(socket.room);

	socket.join(newroom);
	socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);

	socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');

	socket.room = newroom;
	socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
	socket.emit('updaterooms', rooms, newroom);
});


http.listen(port, function(){
	console.log('listening on *:' + port);
});
