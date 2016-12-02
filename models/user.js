'use strict'

var mongoose = require('mongoose');
var hashTool = require('../utils/hash.js');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	birthday: {
		type: Date
	},	
	avatar: {
		type: String
	},
	role: {
		type: Number, 
		required: true
	},
	enrollId: {
		type: Array
	},
	expiredVIPDate: {
		type: Date,
		default: Date.now
	}
});

// Execute before each user.save() call
UserSchema.pre('save', function(next) {
	var user = this;
	var salt = hashTool.generateSaltRandom();
	var hash = hashTool.hashPasswordWithSalt(this.password, salt);
	user.salt = salt;
	user.password = hash;
	next();
});

// true: 2 password are the same | false: 2 password are difference 
UserSchema.methods.verifyPassword = function(password) {
	var user = this;
	var hash = hashTool.hashPasswordWithSalt(password, user.salt);
	if(hash == user.password){
		return true;
	}else{
		return false;
	}
};

module.exports = mongoose.model('User', UserSchema);

// role
// 0 : guest
// 1 : client not VIP
// 2 : client VIP
// 3 : admin