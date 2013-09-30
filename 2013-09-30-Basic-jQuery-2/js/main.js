$(document).ready(initialize);

function initialize()
{
  $('#button1').click(change_green);
}

function change_green()
{
  $('#green').css('background-color', 'yellow');
}
