exports.init = function(app) {
  app.get('/', home); //homepage

  app.get('/login', login)
  app.get('/signup', signup)
  app.get('/profboard', profboard)

}

function home(req, res){

	res.render('home')

}

function login(req, res) {
  res.render('login')
}

function signup(req, res) {
  res.render('signup')
}

function profboard(req, res) {
  res.render('profboard')
}
