exports.init = function(app) {
  app.get('/', home); //homepage
<<<<<<< HEAD

=======
>>>>>>> 564d551cbd1036dd6fb91e3e601e55e5462b7749
  app.get('/login', login)
  app.get('/signup', signup)

}

function home(req, res){

	res.render('home')

}

function login(req, res) {
  res.render('login')
  
}

function signup(req, res){
	res.render('signup')
}
