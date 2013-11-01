var mongoose = require('mongoose');
var Song = mongoose.model('Song');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Express', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  res.render('songs/new', {title: 'Express'});
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  req.body.genres = req.body.genres.split(', ');
  new Song(req.body).save(function(err, song, count){
    res.redirect('/songs');
  });
};
