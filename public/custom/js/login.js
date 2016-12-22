$(document).ready(function() {
  var $buttonLogin = $('#button-login');
  var $tbUsername = $('#username');
  var $tbPassword = $('#password');

  $buttonLogin.on('click', toTriggerLogin);

  function toTriggerLogin() {
    if ($tbUsername.val() == "") {
          alert("Please type a task on textbox");
          $tbUsername.focus();
          return false;
      }
      if ($tbPassword.val() == "") {
          alert("Please type a task on textbox");
          $tbPassword.focus();
          return false;
      }
      var _data = {
          username: $tbUsername.val(),
          password: $tbPassword.val()
      };

      $.ajax({
          url: "/api/login",
          dataType: "json",
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(_data)
      });
  }

  function login(account) {
      return $.ajax({
          url: "/api/login",
          dataType: "json",
          type: 'post',
          contentType: 'application/json',
          data: JSON.stringify(account)
      });
  }     

});