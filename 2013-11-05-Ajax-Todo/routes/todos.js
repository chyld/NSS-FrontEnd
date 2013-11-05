var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');

/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(err, priorities){
    res.render('todos/index', {title: 'Express', priorities: priorities});
  });
};
