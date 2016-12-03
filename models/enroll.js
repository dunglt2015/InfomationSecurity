'use strict'
var mongoose = require('mongoose');

var EnrollSchema   = new mongoose.Schema({
  courseId: { type: String, required: true },
  userId:{ type: String, required: true },
  status: { type: Number, required: true, default: 0},
  enrollTime: { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Enroll', EnrollSchema);

/*
status:
0: da dang ki hoc
1: hoan thanh khoa hoc
*/