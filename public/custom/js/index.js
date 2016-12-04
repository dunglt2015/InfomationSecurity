;
(function(functionAsParam){
	functionAsParam(window.jQuery, window, document);
}(function($, window, document){
	// listen for the jQuery ready event on the document
	$(function() {
		// The DOM is ready!
		toDoFeature();
	});
}));

function toDoFeature(){
	var $buttonSignUp = $("#button-signup");
	var $buttonLogIn = $("#button-login");
	

	// bind event for rendered element initially
	$buttonSignUp.on('click', redirectToSignUpPage);
	$buttonLogIn.on('click', redirectToLoginPage);
	
	function redirectToSignUpPage(){
		console.log('sign up');
		window.location.href = '/signup';
	}

	function redirectToLoginPage(){
		window.location.href = '/login';
	}
} //toDoFeature


