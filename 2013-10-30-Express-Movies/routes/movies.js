var db = require('../modules/database');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie');
var _ = require('lodash');

/*
 * GET /movies
 */

exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){return new Movie(genericMovie);});

  res.render('movies/index', {title: 'Movies', movies: movies});
};

/*
 * DELETE /movies/Jaws
 */

exports.delete = function(req, res){
  var title = req.params.title;
  var movies = db.read(file);
  movies = _.reject(movies, function(movie){return movie.title === title;});
  db.write(file, movies);
  res.redirect('/movies');
};

/*
 * GET /movies/new
 */

exports.new = function(req, res){
  res.render('movies/new', {title: 'New'});
};

/*
 * POST /movies
 */

exports.create = function(req, res){
  var movies = db.read(file);
  movies.push(req.body);
  db.write(file, movies);
  res.redirect('/movies');
};
