$(document).ready(initialize);

function add(num1, num2)
{
  return num1 + num2;
}

function initialize()
{
  $('#add').click(compute_sum);
}

function compute_sum()
{
  var num1 = $('#num1').val();
  var num2 = $('#num2').val();
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  var sum = add(num1, num2);
  $('#result').text(sum);
}
