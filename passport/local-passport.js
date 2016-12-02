'use strict'

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');
var hashTool = require('../utils/hash.js');

var configPassport = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serializing user to session');
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserializing from id to user with id = ' + id);
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true,
            passReqToCallback: true
        },
        function(req, email, password, done) {
        	User.findOne({'email': email}, function(err, user){
        		if(err){
        			return done(err);
        		};
        		if(!user){
        			return done(null, false, 'email is incorrect');
        		};
        		var hash = hashTool.hashPasswordWithSalt(password, user.salt);
				if(hash != user.password){
					return done(null, false, 'password is incorrect');
				}else{
					return done(null, user, 'email and password are OK');
				}        		

        	})
        }
    ));
}

module.exports = configPassport;	