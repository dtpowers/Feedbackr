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
function logIn(username, password) {

  $.ajax({
    url: "/users/?username=" + username + "&password=" + password,
    type: 'GET',
    success: function(result) {
      if (result[0]) {
        localStorage.username = result[0].username;
        localStorage.password = result[0].password;
        console.log(result[0]);
        relog();
      } else {
        alert("That username or password is incorrect");
      }

    }
  });

}

//for keeping credentials during a session
//load user information on page load
function relog() {
  User.username = localStorage.username;
  User.password = localStorage.password;
}

//add new user to db
//before add, ensure its not a duplicate user
function register(username, password, email) {
  var tempUser = {};
  tempUser.username = username;
  tempUser.password = pw;
  tempUser.email = email;

  //this validation should be server side
  //this has obvious security concerns and should be fixed for production
  $.ajax({
    url: "users/?username=" + username,
    type: 'GET',
    success: function(result) {
      if (result[0]) {
        alert("that username is taken");
        return;

      } else {
        $.ajax({
          url: "/users/",
          data: tempUser,
          type: 'PUT',
          success: function(result) {
            logIn(username, pw);
            console.log("Logging in...");

          }
        });
      }

    }
  });

}