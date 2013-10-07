'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add').click(addTask);
  $('table').on('click', '.done', completeTask);
  $('table').on('click', '.remove', removeTask);
  $('table').on('click', '.up, .down', moveTask);
}

function completeTask(){
  var $checkbox = $(this);
  var $tr = $checkbox.closest('tr');

  if($checkbox.prop('checked')){
    $tr.css('text-decoration', 'line-through').css('background-color', 'grey');
  } else {
    $tr.css('text-decoration', 'inherit').css('background-color', 'inherit');
  }
}

function removeTask(){
  $(this).closest('tr').remove();
}

function moveTask(){
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

function addTask(){
  var date = $('#date').val();
  var task = $('#task').val();
  var color = $('#color').val();

  var $dateTd = $('<td>');
  $dateTd.text(date);

  var $taskTd = $('<td>');
  $taskTd.text(task);

  var $colorTd = $('<td>');
  $colorTd.css('background-color', color);

  var $doneTd = $('<td>');
  var $doneCheckBox = $('<input>');
  $doneCheckBox.attr('type', 'checkbox');
  $doneCheckBox.addClass('done');
  $doneTd.append($doneCheckBox);

  var $removeTd = $('<td>');
  var $removeCheckBox = $('<input>');
  $removeCheckBox.attr('type', 'checkbox');
  $removeCheckBox.addClass('remove');
  $removeTd.append($removeCheckBox);

  var $updownTd = $('<td>');
  var $upImg = $('<img>');
  $upImg.attr('src', 'images/up.png');
  $upImg.addClass('up');
  var $downImg = $('<img>');
  $downImg.attr('src', 'images/down.png');
  $downImg.addClass('down');
  $updownTd.append($upImg, $downImg);

  var $tr = $('<tr>');
  $tr.append($dateTd, $taskTd, $colorTd, $doneTd, $removeTd, $updownTd);
  $('table').append($tr);
}
