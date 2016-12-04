$(document).ready(function() {
    $('#signup').on('click', signup);
    var $fullname = $("#Fullname");
    var $email = $("#Email");
    var $password = $("#Password");

    function signup() {
        if (($fullname.val() == '') || ($email.val() == '') || ($password.val() == '')) {
            $('.alert').text("Type full field, please!");
            $('.alert').fadeIn(500);
            setTimeout("$('.alert').fadeOut(1500);", 3000);
        } else {
            var account = {
                name: $fullname.val(),
                email: $email.val(),
                password: $password.val(),
                role: 1
            }

            $.ajax({
                url: "http://localhost:8000/api/users",
                dataType: "json",
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(account)
            }).done(function(output) {
                if (output.err) {
                    $('.alert').text(output.message);
                    $('.alert').fadeIn(500);
                    setTimeout("$('.alert').fadeOut(1500);", 3000);
                } else {
                    $('.success').text(output.message);
                    $('.success').fadeIn(500);
                    setTimeout(function(){
                        $('.success').fadeOut(1500);
                        window.location.href = '/login';
                    }, 3000);                   
                    
                }
            }).fail(function(err) {
                console.log(err);
            });
        }
    }




    $('.form-control').keypress(function() {
        $('.log-status').removeClass('wrong-entry');
    });
    $('#login').click(function() {
        window.location.href = '/login';
    });
});