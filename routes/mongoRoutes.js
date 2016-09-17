//include the mongo model
var mongoModel = require('../models/mongoModel.js')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto');
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'cmufeedbackr@gmail.com',
      pass: 'cmufeedbackr1'
    }
  }));

exports.init = function(app) {

  app.get('/', sendEmail)

  app.get('/mongo/:collection', doRead); // CRUD Retrieve

  app.put('/mongo/:collection', doCreate); // CRUD Create

  app.post('/mongo/:collection', doUpdate); // CRUD Update

  app.delete('/mongo/:collection', doDelete); //CRUD Delete

}

generateToken = function(s){
  token = crypto.createHash('md5').update(s).digest('hex');
  return token;
}

sendEmail = function(email_list){
  var mailOptions = {  
  from: 'cmufeedbackr@gmail.com', // sender address
  to: 'suvrathpen@gmail.com', // list of receivers
  subject: 'Hello', // Subject line
  text: 'Hello world ?', // plaintext body
  html: '<b>Hello world ?</b>' // html body
};
console.log(generateToken("suvrathpen@gmail.com"));
transporter.sendMail(mailOptions, function (error, info) {
  //Email not sent
  if (error) {
      console.log(error);
  }
  //Yay!! Email sent
  else {
      console.log("email successfully sent" + info.response);
  }
});

}

doCreate = function(req, res) {
  //return if there is nothing to create
  console.log(req.body);
  if (Object.keys(req.body).length == 0) {
    res.send(false);
    return;
  }

  console.log(req.params);
  mongoModel.create(req.params.collection, req.body,
    function(result) {
      res.send(result);
    });
}


doRead = function(req, res) {
  var filter = req.query.find ? JSON.parse(req.query.find) : {};
  mongoModel.read(req.params.collection, filter,
    function(modelData) {
      res.send(modelData);
      return modelData;
    });
}


doUpdate = function(req, res) {
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};

  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.send("No update operation defined");
    return;
  }

  var update = JSON.parse(req.body.update);
  mongoModel.update(req.params.collection, filter, update,
    function(status) {
      res.send(status);
    });
}


doDelete = function(req, res) {
  var filter = req.body.find ? JSON.parse(req.body.find) : {};

  mongoModel.mDelete(req.params.collection, filter,
    function(status) {
      res.send(status);
    });
}