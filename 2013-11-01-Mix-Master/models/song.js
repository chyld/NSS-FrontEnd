var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:    String,
  duration: Number,
  genres:   [String],
  art:      String,
  filename: String,
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);
