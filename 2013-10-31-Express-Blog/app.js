// model definitions
require('./models/post');

// express application
var home = require('./routes/home');
var posts = require('./routes/posts');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/blogger');

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
app.get('/posts', posts.index);
app.get('/posts/new', posts.new);
app.post('/posts', posts.create);
app.get('/posts/:id/edit', posts.edit);
app.put('/posts/:id', posts.update);
app.get('/posts/:id', posts.show);
app.delete('/posts/:id', posts.delete);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
