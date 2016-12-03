'use strict'
var mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	courseId: {type: String, required: true},
	indexNumber: {type: Number, required: true},
	content: {type: String, required: true},
	totalTime: {type: Number, required: true},
	status: {type: Number, required: true, default: 1}
});

module.exports = mongoose.model('Lesson', LessonSchema);

/*
	status:
	1: free
	2: NOT free
*/