'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
}

function rsvp(){
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];
}

function addRow(){
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');

  var $input = $('<input>');
  $input.attr('type', 'text');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP!');
  $button.addClass('rsvp');

  $ctrl.append($input, $button);
  $tr.append($name, $food, $ctrl);
  $('table').append($tr);

  $input.focus();
}
