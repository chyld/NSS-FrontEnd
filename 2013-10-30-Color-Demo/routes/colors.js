
/*
 * GET /colors
 */

exports.index = function(req, res){
  var colors = ['blue', 'green', 'orange', 'olive', 'red'];
  res.render('colors/index', {title: 'Colors', colors: colors});
};
