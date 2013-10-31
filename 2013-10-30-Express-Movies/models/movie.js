var mm = require('money-math');

var Movie = function(genericMovie){
  this.title = genericMovie.title;
  this.image = genericMovie.image;
  this.color = genericMovie.color;
  this.rated = genericMovie.rated;
  this.studio = genericMovie.studio;
  this.gross = parseFloat(genericMovie.gross);
  this.numTheatres = parseInt(genericMovie.numTheatres);

  this.grossPerTheatre = function(){
    return this.gross / this.numTheatres;
  };

  this.grossUSD = function(){
    return '$' + mm.format('USD', mm.floatToAmount(this.gross));
  };

  this.grossPerTheatreUSD = function(){
    return '$' + mm.format('USD', mm.floatToAmount(this.grossPerTheatre()));
  };
};

module.exports = Movie;
