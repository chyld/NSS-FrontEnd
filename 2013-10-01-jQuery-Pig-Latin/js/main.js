$(document).ready(initialize);

function string_to_pig_latin(string)
{
  return string.slice(1) + string[0] + 'a';
}

function initialize()
{
  $('#pig').click(pig_latin_conversion);
}

function pig_latin_conversion()
{
  var original = $('#original').val();
  var piglatin = string_to_pig_latin(original);
  $('#piglatin').val(piglatin);
}
