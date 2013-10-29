
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home/index', { title: 'Home: Address Book' });
};
