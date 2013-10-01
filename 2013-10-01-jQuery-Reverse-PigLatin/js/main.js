$(document).ready(initialize);

function word_to_pig_latin(word)
{
  return word.slice(1) + word[0] + 'a';
}

function reverse_words_convert_pig_latin(sentence)
{
  var words = sentence.split(', ');
  var reversed_words = words.reverse();
  for(var i = 0; i < reversed_words.length; i++)
    reversed_words[i] = word_to_pig_latin(reversed_words[i]);
  var new_sentence = reversed_words.join('; ');
  return new_sentence;
}

function initialize()
{
  $('#convert').click(run_the_conversion);
}

function run_the_conversion()
{
  var original = $('#original').val();
  var modified = reverse_words_convert_pig_latin(original);
  $('#output').text(modified);
}
