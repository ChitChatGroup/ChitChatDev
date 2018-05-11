
var socket = io.connect('http://localhost:8080');


//Query DOM
var message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');

var handle;

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
});


//Listen for events
socket.on('chat', function (data) {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';

