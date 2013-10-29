var database = require('../modules/database');

/*
 * GET /people
 */

exports.index = function(req, res){
  var people = database.read(__dirname + '/../db/people.json');
  res.render('people/index', { title: 'People: Address Book', people: people });
};
