test( "Filter Even Numbers", function() {
  var numbers = _.range(10);
  var expected = [0, 2, 4, 6, 8];
  deepEqual(filter_evens(numbers), expected, "testing the filter_evens function" );
});

test( "Filter Odd Numbers", function() {
  var numbers = _.range(10);
  var expected = [1, 3, 5, 7, 9];
  deepEqual(filter_odds(numbers), expected, "testing the filter_odds function" );
});

test( "Filter Short Strings", function() {
  var strings = ["hello", "there", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ['a', 'the', 'cat'];
  deepEqual(filter_short_strings(strings), expected, "testing short strings under 4 characters" );
});

test( "Filter 'A' Strings", function() {
  var strings = ["apple", "hello", "there", "a", "the", "cat", "Aardvark", "elephant", "encyclopedia"];
  var expected = ['apple', 'a', 'Aardvark'];
  deepEqual(filter_a_strings(strings), expected, "strings should begin with letter a" );
});

test( "Find a String", function() {
  var strings = ["apple", "hello", "there", "a", "the", "cat", "Aardvark", "elephant", "encyclopedia"];
  var expected = "elephant";
  deepEqual(find_string(strings, "elephant"), expected, "should find the string in the array" );
});
