$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.color').on('click', clickColor);
}

function clickColor(){
  $(this).css('background-color', 'white');
}
