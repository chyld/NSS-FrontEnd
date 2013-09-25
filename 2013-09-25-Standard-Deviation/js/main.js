var scores = [];
var sum = 0;
var avg = 0;

for(var i = 0; i < 10; i++)
{
  var score = prompt("Test Score?");
  score = parseFloat(score);
  scores.push(score);
  sum += score;
}

avg = sum / scores.length;

var sum_of_squares = 0;

for(i = 0; i < 10; i++)
  sum_of_squares += Math.pow(scores[i] - avg, 2);

var standard_deviation = Math.sqrt(sum_of_squares / scores.length)
