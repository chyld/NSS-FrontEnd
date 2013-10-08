'use strict';

$(document).ready(initialize);

var timer;

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start(){
  var delay = $('#delay').val();
  delay = parseFloat(delay, 10) * 1000;
  timer = setInterval(createColor, delay);
}

function createColor(){
  var dimensions = $('#dimensions').val();
  dimensions = dimensions.split(', ');
  var width = dimensions[0];
  var height = dimensions[1];

  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var alpha = Math.random();
  var rgba = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';

  var $color = $('<div>');
  $color.addClass('color');
  $color.css('width', width).css('height', height).css('background-color', rgba);
  $('#colors').prepend($color);
}

function stop(){
  clearInterval(timer);
}