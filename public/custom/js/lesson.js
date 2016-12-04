$(document).ready(function(){
	var $content = $('#content');
	var $lessonId = $('#lesson-id');
	var $title = $('#title');

	var lessonId = $lessonId.text();
	$.getJSON('../api/lessons/'+ lessonId).done(function(res){
		console.log(res);
		if(res.err){
			$content.addClass('text-danger');
			$content.text(res.message);
		}else{
			$content.addClass('text-info');
			$title.text('Lesson '+res.data.indexNumber+':  ' + res.data.title);	
		}
	});
});