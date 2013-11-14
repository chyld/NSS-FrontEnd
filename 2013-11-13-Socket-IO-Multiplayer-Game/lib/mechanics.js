var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var __ = require('lodash');

exports.findGame = function(name, fn){
  Game.findOne({name:name}).populate('players').exec(function(err, game){
    fn(err, game);
  });
};

exports.newGame = function(name, fn){
  new Game({name:name}).save(function(err, game){
    Game.findById(game.id).populate('players').exec(function(err, game){
      fn(err, game);
    });
  });
};

exports.findPlayer = function(name, fn){
  Player.findOne({name:name}, function(err, player){
    fn(err, player);
  });
};

exports.newPlayer = function(name, color, fn){
  new Player({name:name, color:color}).save(function(err, player){
    fn(err, player);
  });
};

exports.resetPlayer = function(player, socket, fn){
  player.socketId = socket.id;
  player.health = 100;
  player.save(function(err, player){
    fn(err, player);
  });
};

exports.updateCoordinates = function(player, x, y, fn){
  player.x = x;
  player.y = y;
  player.save(function(err, player){
    fn(err, player);
  });
};

exports.playerAttacked = function(player, fn){
  player.health -= __.sample(__.range(10));
  player.save(function(err, player){
    fn(err, player);
  });
};

exports.attachPlayer = function(game, player, fn){
  game.players.push(player);
  game.save(function(err, game){
    fn(err, game);
  });
};

exports.emitPlayers = function(sockets, players, fn){
  for(var i = 0; i < players.length; i++){
    if(sockets[players[i].socketId]){
      sockets[players[i].socketId].emit('playerjoined', {players:players});
    }
  }
  fn();
};
