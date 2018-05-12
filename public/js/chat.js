
var socket = io.connect(window.location.host);
console.log(window.location.hostname)

//Query DOM
var message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');

var handle;


$.getJSON("api/username", function (data) {
  // Make sure the data contains the username as expected before using it
  if (data.hasOwnProperty('username')) {
    console.log('Username: ' + data);
    handle = data.username;
  }
});

var typing = false;
var timeout = undefined;

function timeoutFunction(){
  typing = false;
  socket.emit(noLongerTypingMessage);
}

function onKeyDownNotEntered(){
  if(typing == false) {
    typing = true
    socket.emit(typingMessage);
    timeout = setTimeout(timeoutFunction, 5000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 5000);
  }

}

//Emit Events
btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handler: handle.username
  })
});


//Listen for events
socket.on('chat', function (data) {
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});
