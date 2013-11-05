
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('todos/index', {title: 'Express'});
};
