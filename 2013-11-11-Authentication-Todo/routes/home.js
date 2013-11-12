exports.index = function(req, res){
  console.log('home.index');
  res.render('home/index', {title: 'Express', user: res.locals.user});
};
