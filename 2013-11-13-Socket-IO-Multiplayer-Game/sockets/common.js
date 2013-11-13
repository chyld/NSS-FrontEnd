exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame);
};

function socketDisconnect(){
}

function socketStartGame(data){
  console.log('received a start game message from a browser');
  console.log(data);
}
