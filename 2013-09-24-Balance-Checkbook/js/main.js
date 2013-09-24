var name = prompt('What is your name?');
var balance = prompt('What is the initial balance?');

var dep1 = prompt('Deposit 1?');
var dep2 = prompt('Deposit 2?');
var dep3 = prompt('Deposit 3?');
var with1 = prompt('Withdraw 1?');
var with2 = prompt('Withdraw 2?');
var with3 = prompt('Withdraw 3?');

balance = parseFloat(balance);
dep1 = parseFloat(dep1);
dep2 = parseFloat(dep2);
dep3 = parseFloat(dep3);
with1 = parseFloat(with1);
with2 = parseFloat(with2);
with3 = parseFloat(with3);

var deposits = 0;
deposits += dep1;
deposits += dep2;
deposits += dep3;

var withdraws = 0;
withdraws += with1;
withdraws += with2;
withdraws += with3;

balance += (deposits - withdraws);
balance -= (balance < 0) ? 50 : 0;

console.log('Your balance is: ' + balance);
