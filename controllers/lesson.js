'use strict'
var Lesson = require('../models/lesson');

module.exports.postLessons = function(req, res){
	var lesson = new Lesson({
		title: req.body.title,
		description: req.body.description,
		courseId: req.body.courseId,
		indexNumber: req.body.indexNumber,
		content: req.body.content,
		totalTime: req.body.totalTime,
		status: req.body.status
	});
	console.log(lesson);
	lesson.save(function(err){
		if (err){
			console.log(err);
        	 return res.json({ err: true, message: 'Add lesson failed!', data: null });
        }
        res.json({ err: false, message: 'Lesson is added successful!', data: lesson});
	});
};

module.exports.getLessons = function(req, res){
	Lesson.find({}, function(err, lessons){
		if(err)
			return res.send(err);
		res.json(lessons);
	})
};

module.exports.getLessonsByCourseId = function(req, res){
	Lesson.find({courseId: req.params.courseId}, function(err, lessons){
		if(err)
			return res.send(err);
		res.json(lessons);
	}).sort( { indexNumber: 1 } )
};

module.exports.getLessonById = function(req, res){
	Lesson.findOne({_id: req.params.id}, function(err, lesson){
		if(err)
			return res.send(err);
		res.json(lesson);
	})
};
