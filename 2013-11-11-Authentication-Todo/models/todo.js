var mongoose = require('mongoose');

var Todo = mongoose.Schema({
  title      : {type: String, required: true},
  category   : String,
  dueDate    : Date,
  isComplete : {type: Boolean, default: false},
  user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt  : {type: Date, default: Date.now}
});

mongoose.model('Todo', Todo);
