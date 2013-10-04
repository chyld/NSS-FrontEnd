'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nuke', nuke);
  $('table').on('click', '.up, .down', move);
}

function move(){
  var $img = $(this);
  var $tr = $img.parent().parent();

  if($img.hasClass('up')){
    if(!$tr.prev().hasClass('home')){
      $tr.prev().before($tr);
    }
  } else {
    $tr.next().after($tr);
  }
}

function nuke(){
  var $button = $(this);
  var $tr = $button.parent().parent();
  $tr.remove();
}

function rsvp(){
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];
  var $nameTD = $button.parent().prev().prev();
  var $foodTD = $button.parent().siblings('.food');
  $nameTD.text(name);
  $foodTD.text(food);
}

function addRow(){
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');
  var $nuke = $('<td>');
  var $updown = $('<td>');

  var $input = $('<input>');
  $input.attr('type', 'text');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP!');
  $button.addClass('rsvp');

  var $nukeButton = $('<input>');
  $nukeButton.attr('type', 'button');
  $nukeButton.val('NUKE!');
  $nukeButton.addClass('nuke');

  var $upImg = $('<img>');
  $upImg.attr('src', 'images/up.png');
  $upImg.addClass('up');
  var $downImg = $('<img>');
  $downImg.attr('src', 'images/down.png');
  $downImg.addClass('down');

  $ctrl.append($input, $button);
  $nuke.append($nukeButton);
  $updown.append($upImg, $downImg);

  $tr.append($name, $food, $ctrl, $nuke, $updown);
  $('table').append($tr);

  $input.focus();
}
