exports.init = function(app) {
  app.get('/', home)

  app.get('/login', login)
  app.get('/signup', signup)
  app.get('/profboard', profboard)
  app.get('/assignment', assignment)
  app.get('/feedback', feedback)
  app.get('/studboard', studboard)
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

function assignment(req, res) {
  res.render('sample-assignment')
}

function feedback(req, res) {
  res.render('sample-feedback')
}

function studboard(req, res) {
  res.render('studboard')
}
