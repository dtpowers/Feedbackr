var express = require('express')
engine = require('ejs-mate')
fs = require('fs')
morgan = require('morgan')
path = require('path');
bodyParser = require('body-parser')

// This app uses the expressjs framework
app = express();

// Set the views directory
app.set('views', __dirname + '/views');
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// Define the view (templating) engine
app.set('view engine', 'ejs');
// Define how to log events
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Handle static files
app.use(express.static(__dirname + '/public'));


// Load all routes in the routes directory
fs.readdirSync('./routes').forEach(function(file) {
  // There might be non-js files in the directory that should not be loaded
  if (path.extname(file) == '.js') {
    console.log("Adding routes in " + file);
    require('./routes/' + file).init(app);
  }
});

// Catch any routes not already handed with an error message
app.use(function(req, res) {
  var message = 'Error, did not understand path ' + req.path;
  // Set the status to 404 not found, and render a message to the user.
  res.status(404).send({
    'message': message
  });
});


app.listen(3000, function() {
  console.log('If you are reading this our code at least kind of works!');
});
