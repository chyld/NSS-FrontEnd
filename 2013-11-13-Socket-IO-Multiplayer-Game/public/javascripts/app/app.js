/* global getValue, document, window, io */

$(document).ready(initialize);

var socket, game, player, color, players = [];

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#start').on('click', clickStart);
  $('body').on('keyup', keyupMove);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function keyupMove(e){
  var isArrow = _.any([37, 38, 39, 40], function(i){return i === e.keyCode;});

  if(e.keyCode === 13){
    var prey = findPrey();
    socket.emit('attack', {game:game, predator:player, prey:prey.name});
  }

  if(isArrow){
    var p = findPredator();

    switch(e.keyCode){
      case 38:
        p.y--;
        break;
      case 40:
        p.y++;
        break;
      case 37:
        p.x--;
        break;
      case 39:
        p.x++;
        break;
    }

    socket.emit('playermoved', {game:game, player:player, x:p.x, y:p.y});
  }
}

function clickStart(){
  game = getValue('#game');
  player = getValue('#player');
  color = getValue('#color');
  $('table#game').removeClass('hidden');
  $('#current-player').css('color', color).text('::' + player);
  socket.emit('startgame', {game:game, player:player, color:color});
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function findPredator(){
  return _.find(players, function(p){return p.name === player;});
}

function findPrey(){
  var predator = findPredator();
  return _.find(players, function(p){return p.x === predator.x && p.y === predator.y && p.name !== player;});
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
  socket.on('playerjoined', socketPlayerJoined);
}

function socketConnected(data){
  console.log(data);
}

function socketPlayerJoined(data){
  players = data.players;
  htmlResetBoard();

  for(var i = 0; i < data.players.length; i++){
    if(data.players[i].health > 0){
      htmlAddPlayer(data.players[i]);
    }
  }
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlResetBoard(){
  $('.cell .health').css('background-color', 'white');
  $('.cell .player').css('background-color', 'white');
  $('.cell .player').text('');
}

function htmlAddPlayer(player){
  var $cell = $('.cell[data-x="' + player.x + '"][data-y="' + player.y + '"]');
  $cell.find('.health').css('background-color', 'black');
  $cell.find('.health').css('width', player.health + '%');
  $cell.find('.player').css('background-color', player.color);
  $cell.find('.player').text(player.name);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
