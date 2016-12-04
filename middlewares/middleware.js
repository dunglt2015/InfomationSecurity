'use strict'
var Enroll = require('../models/enroll.js');

module.exports.isAuthenticated = function(req, res, next){
	if(req.isAuthenticated()){
        return next();
    }else{
        res.json({err: true, message: 'You must to login for using this feature'});
    }
};

module.exports.isAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 2){
            return next();
        }else{
            res.json({err: true, message: 'You must to be ADMIN for using this feature'});
        }
    }else{
        res.json({err: true, message: 'You must to login for using this feature'});
    }
};

module.exports.isEnrolled = function(req, res, next){
	var _userId = req.user._id;
	var _courseId = req.param.courseId || req.body.courseId;
	Enroll.findOne({courseId: _courseId, userId: _userId}, function(err, enroll){
		if(err){
			res.json({err: true, message: 'You must to enroll for using this feature'});
		}else{
			return next();
		}
	})
};