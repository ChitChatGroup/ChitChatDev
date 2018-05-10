

io.on('connection', function(socket){

  socket.on('chat message', function(data){
    io.emit('new message', {msg: data, id: socket.username});
   
    
    console.log(data)
    

  });
})