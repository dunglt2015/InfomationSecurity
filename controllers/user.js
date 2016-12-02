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
    birthday: new Date(req.body.birthday), // new Date('1994-18-02')
    avatar: req.body.avatar,
    role: req.body.role
  });

  user.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'New beer drinker added to the locker room!'});
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