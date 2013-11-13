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
  Game.findOne({name: data.name}, function(err, game){
    if(game){
      console.log('found old game');
      addPlayer(game, data);
    } else {
      new Game({name: data.name}).save(function(err, game){
        console.log('created new game');
        addPlayer(game, data);
      });
    }
  });
}

function addPlayer(game, data){
  Player.findOne({name: data.player}, function(err, player){
    if(player){
      var isFound = __.any(game.players, function(id){return id.toString() === player.id;});
      if(isFound){
        player.health = 100;
        player.save(function(err, player){
          console.log('player found and health restored');
        });
      } else {
        new Player({name: data.player, color: data.color}).save(function(err, player){
          game.players.push(player);
          game.save(function(err, game){
            console.log('new player added to game');
          });
        });
      }
    } else {
      new Player({name: data.player, color: data.color}).save(function(err, player){
        game.players.push(player);
        game.save(function(err, game){
          console.log('new player added to game');
        });
      });
    }
  });
}
