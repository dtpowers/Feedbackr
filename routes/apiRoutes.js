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

exports.generateToken = function(s){
  token = crypto.createHash('md5').update(s).digest('hex');
  return token;
}

exports.sendEmail = function(email_list){
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