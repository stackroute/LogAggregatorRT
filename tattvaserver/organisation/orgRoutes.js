var Orguser_router = require('express').Router();
var UserSchema = require('./users.js');
var dataProvider = require('../core/datamodelprovider');

Orguser_router.get('/:userName', function(req, res) {
  var UserModel = dataProvider.getModel(UserSchema, "tattva");
  UserModel.find([{ 'role': 'ORGUSER' }, { 'role': 'ORGADM' }], null, { sort: { name: 1 } }, function(err, userData) {
    if (err) {
      console.log("error in finding users");
      return res.status(500).json({ error: "Internal error occurred..!" });
    }
    return res.send(userData);
  });
});

Orguser_router.get('/srch/:name', function(req, res) {
  var UserModel = dataProvider.getModel(UserSchema, "tattva");
  UserModel.find({ name: req.params.name }, function(err, user) {
    if (err) {
      console.log("error in finding user");
      return res.status(500).json({ error: "Internal error occurred..!" });
    }
    return res.send(user);
  });
});

Orguser_router.post('/:name', function(req, res) {
  var UserModel = dataProvider.getModel(UserSchema, "tattva");
  var newUser = new UserModel({
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "orgsite": req.body.orgsite,
    "role": req.body.role
  });
  newUser.save(function(err, user) {
    if (err) {
      console.error("Error in saving the user ", err);
      return res.status(500).json({ error: "Internal error in completing operation..!" })
    }
    // console.log("User = ",user);
    res.json(user);
  });
  // console.log("the saving data is here");
});

Orguser_router.patch('/:name', function(req, res) {
  console.log("update user ", req.body);
  var editUser = req.body;
  console.log("edit user", editUser);
  var UserModel = dataProvider.getModel(UserSchema, "tattva");
  UserModel.findOneAndUpdate({ name: editUser.name }, {
    $set: {
      "name": editUser.name,
      "email": editUser.email,
      "password": editUser.password,
      "role": editUser.role
    }
  }, { new: true }, function(err, editUser) {
    console.log("updated user", editUser);
    if (err) {
      console.log("Updating user object failed:", err);
      return res.status(500).json({ error: "Internal error occurred..!" });
    }
    return res.json(editUser);
  });
});

module.exports = Orguser_router;
