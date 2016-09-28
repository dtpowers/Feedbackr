var User = {};
var Token = {};

//page load requirments
$().ready(function() {
  relog();
});


function logOut() {
  localStorage.clear();
  location.reload();
}

//this function pulls the matchins user/ pass pair from the db
//and stores them locally + in browser
function logIn(email, password) {

  $.ajax({
    url: "/mongo/users/?email=" + email + "&password=" + password,
    type: 'GET',
    success: function(result) {
      if (result[0]) {
        localStorage.email = result[0].email;
        localStorage.password = result[0].password;
        console.log(result[0]);
        relog();
      } else {
        alert("That email or password is incorrect");
      }

    }
  });

}

//for keeping credentials during a session
//load user information on page load
function relog() {
  User.email = localStorage.email;
  User.password = localStorage.password;
}

 $("#signUpSub").click(function(e){
  e.preventDefault();
  email = $("#email").val();
  pass = $("#pass").val();
  register(email, pass);
 });

  $("#loginSub").click(function(e){
  e.preventDefault();
  email = $("#email").val();
  pass = $("#pass").val();
  logIn(email, pass);
  window.location.href = "profboard";
 });

$("#tokenForm").submit(function(e){
  e.preventDefault();
  tokenIdentify();

});


$("#button").click(function(){
  console.log("reached this function");
  textInput = $('.uk-form-help-block').next().val();
  textInput = textInput.split(',');
  emails = textInput[1].trim();
  console.log(emails);
  $('#new-assignment-modal').hide()
  $.ajax({
    type: 'POST',
    url: "/email",
    data: {
      email : emails
    },
    success: function(res) {
      console.log(res);
    },
    error: function(err){
      console.log(err);
    }
  });
});

$(".assigned").click(function(){
  window.location.href = "feedback"

});
$(".profAssignment").click(function(){
  window.location.href = "assignment"
});
function tokenIdentify(){
 
  tok = $("#tokenText").val();
  getToken(tok);
  window.location.href = "studboard";
}

function getToken(tok){
   filter = 'find={"token":"' + tok;
  filter += '"}';
  $.ajax({
    url: "/mongo/tokens/",
    data: filter,
    type: 'GET',
    success: function(result) {
      if (result[0]) {
        Token = result[0];
        return;
      } else {
         window.location.href = "studboard";

        //for demonstration purposes this has been disabled

        // alert("thats not a valid token!")
      }

    }
  });


}


//add new user to db
//before add, ensure its not a duplicate user
function register(email, pw) {
  var tempUser = {};
  tempUser.email = email;
  tempUser.password = pw;
  console.log(tempUser);
  

  //this validation should be server side
  //this has obvious security concerns and should be fixed for production
  filter = 'find={"email":"' + email;
  filter += '"}';
  $.ajax({
    url: "/mongo/users/",
    data: filter,
    type: 'GET',
    success: function(result) {
      if (result[0]) {
        alert("that email is taken");
        return;
      } else {
        $.ajax({
          url: "mongo/users/",
          data: tempUser,
          type: 'PUT',
          success: function(result) {
            logIn(email, pw);
            window.location.href = "profboard";
          }
        });
      }

    }
  });

}