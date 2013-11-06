var mongoose = require('mongoose');
var Game = mongoose.model('Game');

/*
 * GET /
 */

exports.index = function(req, res){
  res.render('games/index', {title: 'Shell Game'});
};

/*
 * POST /games/start
 */

exports.create = function(req, res){
  new Game(req.query).save(function(err, game){
    res.send(game);
  });
};

/*
 * PUT /games/:id
 */

exports.complete = function(req, res){
  console.log(req.params);
  console.log(req.body);
  res.send({});
};
