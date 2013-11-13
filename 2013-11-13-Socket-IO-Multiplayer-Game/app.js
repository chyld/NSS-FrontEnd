var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/multiplayer');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
