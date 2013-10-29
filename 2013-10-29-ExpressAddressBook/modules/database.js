var fs = require('fs');

// input people.json
// output [p1, p2, p3]
// example:
// var people = database.read('people.json')
exports.read = function(filename){
  var data = fs.readFileSync(filename);
  data = JSON.parse(data);
  return data;
};

// input people.json, data
// output - nothing
// database.write('people.json', [p1, p2, p3])
exports.write = function(filename, data){
  data = JSON.stringify(data);
  fs.writeFileSync(filename, data);
};
