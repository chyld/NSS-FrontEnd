/* global getValue, document, window, io */

$(document).ready(initialize);

var socket, game, player, color;

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

  if(isArrow){
    var x = $('.cell:contains(' + player + ')').data('x');
    var y = $('.cell:contains(' + player + ')').data('y');

    switch(e.keyCode){
      case 38:
        y--;
        break;
      case 40:
        y++;
        break;
      case 37:
        x--;
        break;
      case 39:
        x++;
        break;
    }

    socket.emit('playermoved', {game:game, player:player, x:x, y:y});
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
  htmlResetBoard();

  for(var i = 0; i < data.players.length; i++){
    htmlAddPlayer(data.players[i]);
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
