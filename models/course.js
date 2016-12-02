'use strict'
var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	description: {type: String, required: true},
	startTime: {type: Date, required: true},
	endTime:{type: Date, required: true},
	price: {type: Number, required: true, default: 0},
	sale: {type: Number, required: true, default: 0},
	image: {type: String},
	rating: {type: Number, default: 0},
	lessonId: {type: Array}
});

module.exports = mongoose.model('Course', CourseSchema);