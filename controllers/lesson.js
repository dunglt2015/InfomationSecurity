'use strict'
var Lesson = require('../models/lesson');

module.exports.postLessons = function(req, res){
	var lesson = new Lesson();

	lesson.description = req.body.description;
	lesson.courseId = req.body.courseId;
	lesson.indexNumber = req.body.indexNumber;
	lesson.content = req.body.content;
	lesson.status = req.body.status;

	lesson.save(function(err){
		if(err)
			return res.send(err);
		res.json({message: 'Lesson added!', data: lesson});
	})
};

module.exports.getLessons = function(req, res){
	Lesson.find({courseId: req.body.courseId}, function(err, lessons){
		if(err)
			return res.send(err);
		res.json(lessons);
	})
};

