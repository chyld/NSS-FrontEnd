$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
  $('.cup').on('click', clickCup);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function submitGame(e){
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    htmlStartGame(data);
  });
}

function clickCup(){
  var guess = $(this).data('position');
  var gameId = $('#cups').data('game');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess:guess}, 'post', 'put', null, function(data, status, jqXHR){
    htmlEndGame(data);
  });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlStartGame(game){
  $('input[name="player"]').val('');
  $('#player').text(game.player);
  $('#cups').attr('data-game', game._id);
  $('#cups').show();
}

function htmlEndGame(game){
  $('#cups').hide();
  $('#player').text(game.didWin);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
