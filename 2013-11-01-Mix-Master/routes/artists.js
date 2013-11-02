var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  res.render('artists/index', {title: 'Express'});
};

/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'Express', songs: songs});
  });
};

/*
 * POST /artists
 */

exports.create = function(req, res){
  console.log('--before--');
  console.log(req.body);

  new Artist(req.body).save(function(err, artist, count){
    console.log('--after--');
    console.log(artist);
    res.redirect('/artists');
  });
};
