'use strict'
var Course = require('../models/course');
var Enroll = require('../models/enroll');



module.exports.postEnrollCourse = function(req, res) {
    var userId = req.body.userId;
    if(userId){
        var  enroll = new Enroll({
            courseId: req.body.courseId,
            userId: userId,
            status: 1,
        });

        enroll.save(function(err) {
        if (err){
             return res.json({ err: true, message: 'Eroll course failed!', data: null });
        }
            res.json({ err: false, message: 'Enroll course successful!', data: enroll });
        });
    }else{
        var needLogin = 1;
        return res.json({ err: true, message: 'You must login before enroll', data: needLogin });
    }
};

module.exports.getEnrollCourseByBothId = function(req,res) {
    var userId = req.params.userId;
    var courseId = req.params.courseId;

    Enroll.findOne({ userId: userId, courseId: courseId }, function(err, enroll) { 
        if (err) {
            return res.json({ err: true, message: 'You have not enrolled this course', data: null });
        } else {
            res.json({err: false, message: 'You have enrolled this course', data: enroll});
    }});
}

module.exports.getEnrolledCourseByUserId = function(req, res) {
    console.log(req.params.id);
    Enroll.find({ userId: req.params.id }, function(err, enrolls) {
        if (err) {
            return res.send(err);
        } else {
            var courseIds = enrolls.map(function(item) {
                return item.courseId });

            Course.find({ _id : { $in: courseIds } }, function(err, courses) {
                if (err)
                    return res.send(err);
                res.json(courses);
            })
        }
    })
};