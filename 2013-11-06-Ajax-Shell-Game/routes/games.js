
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('games/index', {title: 'Shell Game'});
};
