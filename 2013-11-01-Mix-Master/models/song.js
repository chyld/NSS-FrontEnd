var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:     {type: String, required: [true, 'title is required.'], match: [/^[a-zA-Z][a-zA-Z ]*$/, '{VALUE} is an invalid title.']},
  duration:  {type: Number, required: [true, 'duration is required.'], min: [1, 'duration is not a valid number']},
  genres:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art:       {type: String, required: [true, 'art is required.'], match: [/^[a-zA-Z][a-zA-Z-]*\.(png|jpeg|jpg)$/, '{VALUE} is an invalid art filename.']},
  filename:  {type: String, required: [true, 'filename is required.'], match: [/^[a-zA-Z][a-zA-Z-]*\.(mp3|ogg)$/, '{VALUE} is an invalid song filename.']},
  lyrics:    String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);
