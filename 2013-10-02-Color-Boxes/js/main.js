$(document).ready(initialize);

function initialize()
{
  $('#colorbutton').click(makeColorBoxes);
  $('#clearinput').click(clearInput);
  $('#clearboxes').click(clearBoxes);
  $('#colorstring').focus();
}

function clearBoxes()
{
  $('#boxes').empty();
  clearInput();
}

function clearInput()
{
  $('#colorstring').val('');
  $('#colorstring').focus();
}

function makeColorBoxes()
{
  var colorstring = $('#colorstring').val();
  var colors = colorstring.split(', ');
  for(var i = 0; i < colors.length; i++)
  {
    var $color = $('<div>');
    $color.addClass('box');
    $color.text(colors[i]);
    $color.css('background-color', colors[i]);

    $('#boxes').append($color);
  }
}
