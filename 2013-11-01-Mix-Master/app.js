// initializing models
require('./models/song');
require('./models/artist');
require('./models/genre');

// express application
var home = require('./routes/home');
var songs = require('./routes/songs');
var artists = require('./routes/artists');
var genres = require('./routes/genres');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/mixmaster');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/less', less(__dirname + '/less', { compress: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route definitions
app.get('/', home.index);

app.get('/songs', songs.index);
app.get('/songs/new', songs.new);
app.post('/songs', songs.create);
app.get('/songs/:id', songs.show);
app.delete('/songs/:id', songs.delete);

app.get('/artists', artists.index);
app.get('/artists/new', artists.new);
app.post('/artists', artists.create);

app.get('/genres', genres.index);
app.get('/genres/new', genres.new);
app.post('/genres', genres.create);
app.get('/genres/:id/edit', genres.edit);
app.put('/genres/:id', genres.update);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
