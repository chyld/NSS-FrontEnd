var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');
var _ = require('lodash');

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'All Songs', songs: songs});
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(err, song){
    res.render('songs/show', {title: 'Show Song', song: song});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err, genres){
    res.render('songs/new', {title: 'New Song', song: new Song(), genres: genres, _: _});
  });
};

/*
 * GET /songs/:id/edit
 */

exports.edit = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(songErr, song){
    Genre.find(function(genreErr, genres){
      res.render('songs/edit', {title: 'Edit Song', song: song, genres: genres, _: _});
    });
  });
};

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/*
 * POST /songs
 */

exports.create = function(req, res){
  console.log(req.body);
  new Song(req.body).save(function(songErr, song, count){
    if(songErr){
      Genre.find(function(genreErr, genres){
        res.render('songs/new', {title: 'New Song', song: new Song(), genres: genres, err: songErr, _: _});
      });
    } else {
      Genre.find().where('_id').in(song.genres).exec(function(err, genres){
        for(var i = 0; i < genres.length; i++){
          genres[i].songs.push(song.id);
          genres[i].save();
        }
        res.redirect('/songs');
      });
    }
  });
};

/*
 * PUT /songs/:id
 */

exports.update = function(req, res){
  Song.findById(req.params.id, function(err, oldSong){
    Genre.find().where('_id').in(oldSong.genres).exec(function(err, genres){
      for(var i = 0; i < genres.length; i++){
        genres[i].songs.pull(oldSong.id);
        genres[i].save();
      }
    });

    Song.findByIdAndUpdate(req.params.id, req.body, function(songErr, song){
      Genre.find().where('_id').in(song.genres).exec(function(err, genres){
        for(var i = 0; i < genres.length; i++){
          genres[i].songs.push(song.id);
          genres[i].save();
        }
      });

      res.redirect('/songs');
    });
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, req.body, function(err, song){
    res.redirect('/songs');
  });
};
