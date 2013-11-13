/* global getValue, document, window, io */

$(document).ready(initialize);

var socket;
var player;
var color;
var name;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#start').on('click', clickStart);
}

function clickStart(){
  name = getValue('#name');
  player = getValue('#player');
  color = getValue('#color');
  $('table#game').removeClass('hidden');
  socket.emit('startgame', {name:name, player:player, color:color});
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
