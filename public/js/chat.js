

var socket = io.connect(http);


//Query DOM
var message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');

var handle;


// $.get("api/username", function (data) {
//   // Make sure the data contains the username as expected before using it
//   if (data.hasOwnProperty('username')) {
//     console.log('Username: ' + req.user.username);
//     handle = req.user.username;
//   }
// });

app.get("/api/user_data", function (req, res) {
   if (!req.user) {
     // The user is not logged in, send back an empty object
     res.json({});
   } else {
     // Otherwise send back the user's username and id
     // Sending back a password, even a hashed password, isn't a good idea
     res.json({
       
       username: req.user.username,
       
     });
   }
 });

//Emit Events
btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value
  })
});


//Listen for events
socket.on('chat', function (data, username) {
  output.innerHTML += '<p><strong>' + data.username + ':</strong>' + data.message + '</p>';
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});