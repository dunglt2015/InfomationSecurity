'use strict'
var Course = require('../models/course');
var Enroll = require('../models/enroll');



module.exports.postEnrollCourse = function(req, res) {
    var  enroll = new Enroll({
        courseId: req.body.courseId,
        userId: req.body.userId,
        status: req.body.status,
    });

    enroll.save(function(err) {
        if (err){
        	 return res.json({ err: true, message: 'Eroll course failed!', data: null });
        }
        res.json({ err: false, message: 'Enroll course successful!', data: enroll });
    })
};


module.exports.getEnrolledCourseByUserId = function(req, res) {
    console.log(req.params.id);
    Enroll.find({ userId: req.params.id }, function(err, enrolls) {
        if (err) {
            return res.send(err);
        } else {
            var courseIds = enrolls.map(function(item) {
                return item.courseId });
            Course.find({ courseId: { $in: courseIds } }, function(err, courses) {
                if (err)
                    return res.send(err);
                res.json(courses);
            })
        }
    })
};