$(document).ready(initialize);

function initialize()
{
  $('#make_boxes').click(makingBoxes);
}

function makingBoxes()
{
  var numberOfBoxes = $('#amount').val();
  numberOfBoxes = parseInt(numberOfBoxes);

  for(var i = 0; i < numberOfBoxes; i++)
  {
    var $div = $('<div>');
    $div.addClass('box');
    $div.text(i);

    $('#boxes').append($div);
  }
}
