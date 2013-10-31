// express application
var home = require('./routes/home');
var movies = require('./routes/movies');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var app = express();

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
app.get('/movies', movies.index);
app.delete('/movies/:title', movies.delete);
app.get('/movies/new', movies.new);
app.post('/movies', movies.create);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
