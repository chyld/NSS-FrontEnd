var moment = require('moment');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/*
 * GET /posts
 */

exports.index = function(req, res){
  Post.find(function(err, posts){
    res.render('posts/index', {title: 'Express', posts: posts});
  });
};

/*
 * GET /posts/new
 */

exports.new = function(req, res){
  var date = moment().format("MMM Do YYYY, h:mm a");
  res.render('posts/new', {title: 'Express', date: date});
};

/*
 * POST /posts
 */

exports.create = function(req, res){
  new Post(req.body).save(function(err, post, count){
    res.redirect('/posts');
  });
};

/*
 * GET /posts/:id/edit
 */

exports.edit = function(req, res){
  res.render('posts/edit', {title: 'Express'});
};

/*
 * PUT /posts/:id
 */

exports.update = function(req, res){
  res.redirect('/posts/' + req.params.id);
};

/*
 * GET /posts/:id
 */

exports.show = function(req, res){
  Post.findById(req.params.id, function(err, post){
    res.render('posts/show', {title: 'Express', post: post});
  });
};

/*
 * DELETE /posts/:id
 */

exports.delete = function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/posts');
  });
};
