'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add_color').click(addColor);
  $('#add_box').click(addBox);
  $('#colors').on('click', '.box', colorPaletteClicked);
  $('#boxes').on('mouseover', '.canvas', canvasHover);
}

function canvasHover(){
  var $canvas = $(this);
  var brushColor = $('#brush').css('background-color');
  $canvas.css('background-color', brushColor);
}

function colorPaletteClicked(){
  var $box = $(this);
  var color = $box.css('background-color');
  $('#brush').css('background-color', color);
}

function addBox(){
  var amount = $('#amount').val();
  amount = parseInt(amount, 10);
  for(var i = 0; i < amount; i++){
    var $canvas = $('<div>');
    $canvas.addClass('canvas');
    $('#boxes').append($canvas);
  }
}

function addColor(){
  var color = $('#color').val();
  var $div = $('<div>');
  $div.addClass('box');
  $div.css('background-color', color);

  $('#colors').prepend($div);
  clearInputAndFocus();
}

function clearInputAndFocus(){
  $('#color').val('');
  $('#color').focus();
}
