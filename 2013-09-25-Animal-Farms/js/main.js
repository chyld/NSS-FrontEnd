var dogs = [];

var name = prompt('Enter a dogs name or blank to exit?');

while(name)
{
  var dog = {};
  dog.name = name;
  dog.age = parseInt(prompt('Age?'));
  dog.breed = prompt('Breed?');
  dogs.push(dog);
  name = prompt('Enter a dogs name or blank to exit?');
}

var avg_age;
var sum_age = 0;

for(var i = 0; i < dogs.length; i++)
  sum_age += dogs[i].age;

avg_age = sum_age / dogs.length;

console.log('You have ' + dogs.length + ' dogs, the average age is ' + Math.ceil(avg_age));
