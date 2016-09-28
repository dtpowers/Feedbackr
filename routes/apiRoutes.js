var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto');
var mongoModel = require('../models/mongoModel.js')
var Baby = require('babyparse');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'cmufeedbackr@gmail.com',
      pass: 'cmufeedbackr1'
    }
  }));

exports.init = function(app) {
  app.get('/email', renderEmail);
  app.get('/dummy', sendEmail);
}


generateToken = function(s){
  token = crypto.createHash('md5').update(s).digest('hex');
  return token;
}

renderEmail = function(req, res){
  res.render('email');
}

handleFiles = function(file){
  console.log("reached this function");
  console.log(file);
}

//var email_list = ["suvrathpen@gmail.com", "thorasgardthunder@gmail.com"]

sendEmail = function(email_list){
  for(i = 0; i < email_list.length; i++){
    token = generateToken(email_list[i].email);
    console.log(email_list[i].email + 'is: ' + token);
    var mailOptions = {  
      from: 'cmufeedbackr@gmail.com', // sender address
      to: email_list[i].email, // list of receivers
      subject: 'Hello from FeedbackR', // Subject line
      text: 'Hello from FeedbackR', // plaintext body
      html: '<b>Hello User. This is your token to log on the site:' + token + '</b>'  // html body
    };
    mongoModel.create('tokens', {'token': token, 'email': email_list[i].email}, 
    function(error, info){
      if (error) {
        console.log(error);
      }
      else {
        console.log("collection successfully created" + info.response);
      }
    });
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
}