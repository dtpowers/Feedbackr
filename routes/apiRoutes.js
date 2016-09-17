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
  app.get('/email', sendEmail);
}

generateToken = function(s){
  token = crypto.createHash('md5').update(s).digest('hex');
  return token;
}
var email_list = ["suvrathpen@gmail.com", "thorasgardthunder@gmail.com"]
sendEmail = function(){
  for(i = 0; i < email_list.length; i++){
    token = generateToken(email_list[i]);
    console.log(email_list[i] + 'is: ' + token);
    var mailOptions = {  
      from: 'cmufeedbackr@gmail.com', // sender address
      to: email_list[i], // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world ?', // plaintext body
      html: '<b>Hello world ? ' + token + '</b>'  // html body
    };
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