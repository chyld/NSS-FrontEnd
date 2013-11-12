var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.create = function(req, res){
  req.body.user = res.locals.user;

  new Todo(req.body).save(function(err, todo){
    res.send(todo);
  });
};

exports.update = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    todo.isComplete = !todo.isComplete;
    todo.save(function(err, todo){
      res.send(todo);
    });
  });
};
