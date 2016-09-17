exports.init = function(app) {
  app.get('/', home); //homepage

 

}

function home(req, res){

	res.render('home')

}