var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var colors = require('colors');
var _ = require('lodash');

// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('memory.index'.italic.underline.bold.magenta);
  res.render('memory/index', {title: 'Memory Game'});
};

/*
 * POST /memory/start
 */

exports.start = function(req, res){
  console.log('memory.start'.italic.underline.bold.magenta);
  new Game(req.query).save(function(err, game){
    res.send({size: (game.size * 2), id: game.id});
  });
};

/*
 * GET /memory/flip
 */

exports.flip = function(req, res){
  console.log('memory.flip'.italic.underline.bold.magenta);
  Game.findById(req.query.id, function(err, game){
    res.send({position: req.query.position, value: game.board[req.query.position].value});
  });
};

/*
 * PUT /memory/check
 */

exports.check = function(req, res){
  console.log('memory.check'.italic.underline.bold.magenta);
  Game.findById(req.query.id, function(err, game){
    if(game.board[req.body.positions[0]].value === game.board[req.body.positions[1]].value){
      game.board[req.body.positions[0]].match = true;
      game.board[req.body.positions[1]].match = true;
      game.markModified('board');

      var didWin = _.all(game.board, function(square){return square.match;});
      if(didWin) game.endTime = Date.now();

      game.save(function(err, game){
        if(game.endTime)
          res.send({status: 'win', time: game.endTime - game.createdAt});
        else
          res.send({status: 'match'});
      });
    }
    else{
      res.send({status: 'bad'});
    }
  });
};
