function add_three(n)
{
  return n + 3;
}

function square(n)
{
  return n * n;
}

function area(l, w)
{
  return l * w;
}

function volume(l, w, h)
{
  return area(l, w) * h;
}

function power(base, exp)
{
  var product = 1;

  for(var i = 0; i < exp; i++)
    product *= base;

  return product;
}

function greeting(salutation, name)
{
  return salutation + ", " + name + "!";
}

function pig_latin(string)
{
  return string.slice(1) + string[0] + 'a';
}

function pig_greeting(salutation, name)
{
  return pig_latin(salutation) + ", " + pig_latin(name) + "!";
}

function pig_sentence(sentence)
{
  var words = sentence.split(' ');
  var pig_words = [];

  for(var i = 0; i < words.length; i++)
    pig_words.push(pig_latin(words[i]));

  return pig_words.join(' ');
}
