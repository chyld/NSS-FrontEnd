var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var __ = require('lodash');

exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame);
};

function socketDisconnect(){
}

function socketStartGame(data){
  var socket = this;

  Game.findOne({name: data.name}).populate('players').exec(function(err, game){
    if(game){
      console.log('found old game');
      addPlayer(game, data, socket);
    } else {
      new Game({name: data.name}).save(function(err, game){
        Game.findById(game.id).populate('players').exec(function(err, game){
          console.log('created new game');
          addPlayer(game, data, socket);
        });
      });
    }
  });
}

function addPlayer(game, data, socket){
  Player.findOne({name: data.player}, function(err, player){
    if(player){
      var isFound = __.any(game.players, function(id){return id.toString() === player.id;});
      if(isFound){
        player.health = 100;
        player.save(function(err, player){
          console.log('player found and health restored');
          console.log(game);
          notifyPlayersOfJoin(game.players, socket);
        });
      } else {
        new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
          game.players.push(player);
          game.save(function(err, game){
            console.log('new player added to game');
            console.log(game);
            notifyPlayersOfJoin(game.players, socket);
          });
        });
      }
    } else {
      new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
        game.players.push(player);
        game.save(function(err, game){
          console.log('new player added to game');
          console.log(game);
          notifyPlayersOfJoin(game.players, socket);
        });
      });
    }
  });
}

function notifyPlayersOfJoin(players, socket){
  console.log('sending a message');
  for(var i = 0; i < players.length; i++){
    console.log(players[i]);
    if(socket.namespace.sockets[players[i].socketId]){
      socket.namespace.sockets[players[i].socketId].emit('playerjoined', {players:players});
    }
  }
}
