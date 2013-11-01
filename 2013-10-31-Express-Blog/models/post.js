var mongoose = require('mongoose');

var Post = mongoose.Schema({
  title: String,
  author: String,
  date: String,
  tags: String,
  image: String,
  content: String
});

mongoose.model('Post', Post);
