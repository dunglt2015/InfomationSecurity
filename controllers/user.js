'use strict'
var User = require('../models/user');

// Create endpoint /api/users for POST

module.exports.postUsers = function(req, res) {

  if(req.body.birthday == undefined) req.body.birthday = null;
  if(req.body.avatar == undefined) req.body.avatar = 'ava_default.jpg';

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role
  });

  user.save(function(err) {
    if (err)
      if(err.code == 11000){
        return res.json({err: true, message: 'Email is existed! Please try with another', data: null});
      }else{
        return res.json({err: true, message: 'Register failed!', data: null});
      }
    res.json({err: false, message: 'Register successful!', data: user});
  });
};

// Create endpoint /api/users for GET
module.exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};