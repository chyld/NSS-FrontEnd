var mongoose = require('mongoose');

var Artist = mongoose.Schema({
  name :     String,
  photo:     String,
  website:   String,
  bio:       String,
  songs :    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Artist', Artist);
