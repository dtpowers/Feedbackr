exports.init = function(app) {
  app.get('/', home); //homepage

  app.get('/login', login)

}

function home(req, res){

	res.render('home')

}

function login(req, res) {
  res.render('login')
}
