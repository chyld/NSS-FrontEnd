test("word_to_pig_latin", function() {
  deepEqual(word_to_pig_latin('hello'), 'elloha', 'hello in pig latin');
});

test("reverse_words_convert_pig_latin", function() {
  deepEqual(reverse_words_convert_pig_latin('hello, nashville, code'), 'odeca; ashvillena; elloha', '3 words reversed and turned into pig latin');
});
