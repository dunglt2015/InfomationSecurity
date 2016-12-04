'use strict'
var Course = require('../models/course');
var Enroll = require('../models/enroll');

module.exports.postCourses = function(req, res) {
    if (req.body.image == undefined) req.body.image = 'course_default.jpg';

    var course = new Course({
        title: req.body.title,
        lecturer: req.body.lecturer,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        lessonId: []
    });

    course.save(function(err) {
        if (err){
        	 return res.json({ err: true, message: 'Add course failed!', data: null });
        }
        res.json({ err: false, message: 'Course is added successful!', data: course });
    })
};

module.exports.getCourses = function(req, res) {
    Course.find({}, function(err, courses) {
        if (err)
            return res.send(err);
        res.json(courses);
    })
};

module.exports.getCourseById = function(req, res) {
    console.log(req.params.id);
    Course.findOne({ _id: req.params.id }, function(err, course) {
        if (err)
            return res.send(err);
        res.json(course);
    })
};


