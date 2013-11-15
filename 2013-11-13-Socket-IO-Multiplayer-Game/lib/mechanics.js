var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');
var __ = require('lodash');
var async = require('async');

exports.findGame = function(name, next){
  Game.findOne({name:name}).populate('players').exec(function(err, game){
    next(err, game);
  });
};

exports.newGame = function(name, next){
  new Game({name:name}).save(function(err, game){
    Game.findById(game.id).populate('players').exec(function(err, game){
      next(err, game);
    });
  });
};

exports.findPlayer = function(name, next){
  Player.findOne({name:name}, function(err, player){
    next(err, player);
  });
};

exports.newPlayer = function(name, color, next){
  new Player({name:name, color:color}).save(function(err, player){
    next(err, player);
  });
};

exports.resetPlayer = function(player, socket, next){
  player.socketId = socket.id;
  player.health = 100;
  player.save(function(err, player){
    next(err, player);
  });
};

exports.updateCoordinates = function(player, x, y, next){
  player.x = x;
  player.y = y;
  player.save(function(err, player){
    next(err, player);
  });
};

exports.playerAttacked = function(player, next){
  player.health -= __.sample(__.range(10));
  player.save(function(err, player){
    next(err, player);
  });
};

exports.attachPlayer = function(game, player, next){
  game.players.push(player);
  game.save(function(err, game){
    next(err, game);
  });
};

exports.emitMessage = function(sockets, players, message, data, next){
  for(var i = 0; i < players.length; i++){
    if(sockets[players[i].socketId]){
      sockets[players[i].socketId].emit(message, data);
    }
  }
  next();
};

exports.potionGenerator = function(game, next){
  var numPotions = __.sample(__.range(10));
  var potions = __.map(__.range(numPotions), function(){
    var x = __.sample(__.range(10));
    var y = __.sample(__.range(10));
    var health = __.sample(__.range(10));
    return {x:x, y:y, health:health};
  });

  next(null, potions);
};

exports.createTimer = function(timer, m, game, io, next){
  clearInterval(timer);
  timer = setInterval(
    function(){
      async.waterfall([
        function(next){m.potionGenerator(game,next);},
        function(potions,next){m.emitMessage(io.sockets,game.players,'potions',{potions:potions},next);}
      ]);
    },3000);
  next();
};
