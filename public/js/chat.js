
var socket = io.connect(window.location.host);
console.log(window.location.hostname)

//Query DOM
var message = document.getElementById('messages'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');

var messageInput = $("input#messages")
var handle;


$.getJSON("api/username", function (data) {
  // Make sure the data contains the username as expected before using it
  if (data.hasOwnProperty('username')) {
    console.log('Username: ' + data);
    handle = data.username;
  }
});




//Emit Events
btn.addEventListener('click', function () {
if (message.value === "") {
  return alert("Message box is empty.")
}

  socket.emit('chat', {
    message: message.value,
    handle: handle
  })

  messageInput.val("")
});


//Listen for events
socket.on('chat', function (data) {
  console.log(data)
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});



