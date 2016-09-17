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

//add new user to db
//before add, ensure its not a duplicate user
function register(email, pw) {
  console.log("fire");
  var tempUser = {};
  tempUser.email = email;
  tempUser.password = pw;
  console.log(tempUser);
  

  //this validation should be server side
  //this has obvious security concerns and should be fixed for production
  $.ajax({
    url: "/mongo/users/?email=" + email,
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
            console.log("Logging in...");
          }
        });
      }

    }
  });

}