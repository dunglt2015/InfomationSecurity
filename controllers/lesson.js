'use strict'
var Lesson = require('../models/lesson');
var Enroll = require('../models/enroll');

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

	lesson.save(function(err){
		if (err){
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
		if(err){
			return res.json({err: true, message: 'There was some error when excuting', data: null});
		}else{
			if(lesson == null){
				return res.json({err: true, message: 'This lesson is not exists', data: null});
			}else{
				if(lesson.status == 1){
					return res.json({err: false, message: 'This lesson is free for everyone', data: lesson});
				}else{
					if(req.isAuthenticated()){
						var userId = req.user._id;
						var courseId = lesson.courseId;
						Enroll.findOne({courseId: courseId, userId: userId}, function(err, enroll){
							if(err){
								return res.json({err: true, message: 'There was some error when excuting', data: null});
							}else{							
								if(enroll == null){
									res.json({err: true, message: 'You must to enroll this course before following this lesson', data: null});
								}else{
									res.json({err: false, message: 'You can read this lesson', data: lesson});
								}
							}
						});
					}else{
						res.json({err: true, message: 'You must to login and enroll this course before following this lesson', data: null});
					}
				}
			}
				
		}
	})
};