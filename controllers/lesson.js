'use strict'
var Lesson = require('../models/lesson');

module.exports.postLessons = function(req, res){
	var lesson = new Lesson();
	lesson.title = req.body.title;
	lesson.description = req.body.description;
	lesson.courseId = req.body.courseId;
	lesson.indexNumber = req.body.indexNumber;
	lesson.content = req.body.content;
	lesson.totalTime = req.body.totalTime;
	lesson.status = req.body.status;

	lesson.save(function(err){
		if (err){
        	 return res.json({ err: true, message: 'Add lesson failed!', data: null });
        }
        res.json({ err: false, message: 'Lesson is added successful!', data: lesson});
	})
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
	})
};

module.exports.getLessonById = function(req, res){
	Lesson.findOne({_id: req.params.id}, function(err, lesson){
		if(err)
			return res.send(err);
		res.json(lesson);
	})
};
