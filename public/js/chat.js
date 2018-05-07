var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(data){
    io.emit('new message', {msg: data, id: socket.id});
   
    
    console.log(data)
    

  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
