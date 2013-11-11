var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;

  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err)
        res.send({status: 'error'});
      else
        res.send({status: 'ok'});
    });
  });
}
