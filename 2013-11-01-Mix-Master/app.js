//initializing models
require('./models/song');
require('./models/genre');

// express application
var home = require('./routes/home');
var songs = require('./routes/songs');
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

app.get('/genres', genres.index);
app.get('/genres/new', genres.new);
app.get('/genres/:id', genres.show);
app.get('/genres/:id/edit', genres.edit);
app.post('/genres', genres.create);
app.put('/genres/:id', genres.update);
app.delete('/genres/:id', genres.delete);

app.get('/songs', songs.index);
app.get('/songs/new', songs.new);
app.get('/songs/:id', songs.show);
app.get('/songs/:id/edit', songs.edit);
app.post('/songs', songs.create);
app.put('/songs/:id', songs.update);
app.delete('/songs/:id', songs.delete);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
