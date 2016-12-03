'use strict'
var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	title: {type: String, required: true},
	lecturer: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true, default: 0},
	image: {type: String},
	lessonId: {type: Array}
});

module.exports = mongoose.model('Course', CourseSchema);