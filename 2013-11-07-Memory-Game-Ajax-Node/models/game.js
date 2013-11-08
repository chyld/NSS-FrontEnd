var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  board     : [{}],
  size      : Number,
  player    : String,
  endTime   : Date,
  createdAt : {type: Date, default: Date.now}
});

Game.pre('save', function(next){
  if(!this.board.length){
    this.board = _.range(this.size).concat(_.range(this.size));
    this.board = _.shuffle(this.board);
    this.board = _.map(this.board, function(n){return {match: false, value: n};});
  }

  next();
});

mongoose.model('Game', Game);
