;
(function(functionAsParam) {
    functionAsParam(window.jQuery, window, document);
}(function($, window, document) {
    // listen for the jQuery ready event on the document
    $(function() {
        // The DOM is ready!
        toDoFeature();
    });
}));

function toDoFeature() {
    var $buttonSignUp = $("#button-signup");
    var $buttonLogIn = $("#button-login");


<<<<<<< HEAD
	function redirectToLoginPage(){
		window.location.href = '/login';
	}
} //toDoFeature
=======
    // bind event for rendered element initially
    $buttonSignUp.on('click', redirectToSignUpPage);
    $buttonLogIn.on('click', redirectToLoginPage);
>>>>>>> 2b2e64c75d01c8226a339773addd7c3c36c83ab5

    function redirectToSignUpPage() {
        console.log('sign up');
        window.location.href = '/signup';
    }

    function redirectToLoginPage() {
        window.location.href = '/login';
    }