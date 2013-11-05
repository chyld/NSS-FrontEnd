var mongoose = require('mongoose');

var Todo = mongoose.Schema({
  title      : String,
  dueDate    : Date,
  priority   : {type: mongoose.Schema.Types.ObjectId, ref: 'Priority'},
  createdAt  : {type: Date, default: Date.now}
});

mongoose.model('Todo', Todo);
