var mongoose = require('mongoose');

var Genre = mongoose.Schema({
  name:      {type: String, required: true},
  songs :    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Genre', Genre);
