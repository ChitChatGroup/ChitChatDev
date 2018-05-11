<<<<<<< HEAD
<<<<<<< HEAD
var app = require('http').createServer(handler)
var io = require('socket.io')(app);

var socket = io.connect();

io.on('connection', function(socket){

	socket.on('chat message', function(data){
		io.emit('new message', {msg: data, id: socket.username});


		console.log(data)


	});
});
=======
//MAKE CONNECTION 
var socket = io.connect('http://localhost:8080')
=======
>>>>>>> 75d7aa27dde48a073eef2c3e4f5e7959eedf5c3f

var socket = io.connect('http://localhost:8080');

<<<<<<< HEAD
let usernames = {};
>>>>>>> ecbfbb7ccacfd925c06e05f6aa35634778b8a635

let rooms = ['room1', 'room2', 'room3'];
io.sockets.on('connection', function (socket) {
<<<<<<< HEAD
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
=======
=======

//Query DOM
var message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');
>>>>>>> 75d7aa27dde48a073eef2c3e4f5e7959eedf5c3f

var handle;

<<<<<<< HEAD
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });

  socket.on('chat message', function (data) {
    io.emit('new message', {
      msg: data,
      id: socket.username
    });


    console.log(data)
>>>>>>> ecbfbb7ccacfd925c06e05f6aa35634778b8a635

  });
  
  socket.on('switchRoom', function (newroom) {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  });

<<<<<<< HEAD
http.listen(port, function(){
	console.log('listening on *:' + port);
=======
  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
>>>>>>> ecbfbb7ccacfd925c06e05f6aa35634778b8a635
=======
$.get("api/username", function (data) {
  // Make sure the data contains the username as expected before using it
  if (data.hasOwnProperty('username')) {
    console.log('Username: ' + req.user.username);
    handle = req.user.username;
  }
});

//Emit Events
btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
>>>>>>> 75d7aa27dde48a073eef2c3e4f5e7959eedf5c3f
});


//Listen for events
socket.on('chat', function (data) {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
}
