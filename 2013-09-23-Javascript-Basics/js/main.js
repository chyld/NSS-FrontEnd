/* this is a multi-line
   javascript
   comment
*/

var first_name = prompt("What is your first name?");
var last_name = prompt("What is your last name?");
var full_name = first_name + ' ' + last_name;

debugger;

var test1 = prompt("Score for Test 1?");
test1 = parseFloat(test1);

var test2 = prompt("Score for Test 2?");
test2 = parseFloat(test2);

var test3 = prompt("Score for Test 3?");
test3 = parseFloat(test3);

var average = (test1 + test2 + test3) / 3;

console.log("Your full name is : " + full_name);
console.log("The average of your test scores is : " + average);
