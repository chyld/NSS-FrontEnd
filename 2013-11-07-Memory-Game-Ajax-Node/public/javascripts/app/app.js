$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
  $('#squares').on('click', '.square.active', clickSquare);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function submitGame(e){
  var player = $('input[name="player"]').val();
  var size = $('input[name="size"]').val();
  var url = '/memory/start?player=' + player + '&size=' + size;

  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data){
    htmlStartGame(data);
  });
}

function clickSquare(){
  var id = $('#squares').data('id');
  var position = $(this).data('position');
  var url = '/memory/flip?id=' + id + '&position=' + position;

  sendGenericAjaxRequest(url, {}, 'get', null, null, function(data){
    htmlFlipSquare(data);
  });
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function htmlStartGame(game){
  var squares = _.range(game.size);
  squares = _.map(squares, function(s, i){return '<div class="square active" data-position="' + i + '"></div>';});
  $('#squares').append(squares);
  $('#squares').attr('data-id', game.id);
}

function htmlFlipSquare(square){
  $('.square[data-position="' + square.position + '"]').text(square.value);
  $('.square[data-position="' + square.position + '"]').addClass('flipped');

  if($('.flipped').length === 2){
    $('.active').removeClass('active');
    checkForMatch();
  }
}

function htmlEvaluateResponse(response){
  switch(response.status){
    case 'win':
      $('.flipped').addClass('found');
      $('#time').text((response.time / 1000).toFixed(1) + ' seconds');
      break;
    case 'match':
      $('.flipped').addClass('found');
  }

  setTimeout(
    function(){
      $('.flipped').removeClass('flipped');
      $('.square').not('.found').addClass('active').text('');
    }, 1000);
}

// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function checkForMatch(){
  var id = $('#squares').data('id');
  var url = '/memory/check?id=' + id;
  var positions = _.map($('.flipped'), function(div){
    return $(div).data('position');
  });

  sendGenericAjaxRequest(url, {positions:positions}, 'post', 'put', null, function(data){
    htmlEvaluateResponse(data);
  });
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
