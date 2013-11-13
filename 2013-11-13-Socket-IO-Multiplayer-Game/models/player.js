var mongoose = require('mongoose');
var __ = require('lodash');

function randomize(){
  return __.sample(__.range(10));
}

var Player = mongoose.Schema({
  name      : String,
  color     : String,
  socketId  : String,
  x         : {type: Number, default: randomize},
  y         : {type: Number, default: randomize},
  health    : {type: Number, default: 100},
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Player', Player);
