'use strict'
var Course = require('../models/course');
var Enroll = require('../models/enroll')
module.exports.postCourse = function(req, res){
	if(req.body.image == undefined) req.body.image = 'course_default.jpg';

	var course = new Course({
		description: req.body.description,
		startTime: new Date(req.body.startTime),
		endTime: new Date(req.body.endTime),
		price: req.body.price,
		sale: req.body.sale,
		image: req.body.image,
		rating: 0,
		lessonId: []
	});

	course.save(function(err){
		if(err)
			return res.send(err);
		res.json({message: 'course added!',data: course});
	})
};

module.exports.getCourses = function(req, res){
	Course.find({}, function(err, courses){
		if(err)
			return res.send(err);

		res.json(courses);
	})
};

module.exports.getCourseById = function(req, res){
	Course.find({_id: req.body.courseId}, function(err, course){
		if(err)
			return res.send(err);
		res.json(course);
	})
};

module.exports.getCoursesByUserId = function(req, res){
	Enroll.find({userId: req.user._id}, function(err, enrolls){
		if(err){
			return res.send(err);
		}else{
			var courseIds = enrolls.map(function(item){return item.enrolls});
			Course.find({courseId: {$in: courseIds}}, function(err, courses){
				if(err)
					return res.send(err);
				res.json(courses);
			})
		}
	})
};
