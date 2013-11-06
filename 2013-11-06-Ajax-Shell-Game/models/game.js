var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  actual    : {type: Number, default: function(){return _.sample([0, 1, 2]);}},
  guess     : Number,
  didWin    : {type: Boolean, default: false},
  player    : String,
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('Game', Game);
