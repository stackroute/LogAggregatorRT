var Orguser_router = require('express').Router();
var User = require('./users.js');

Orguser_router.get('/:userName', function(req, res){
User.find({'role' : 'USER'}, function(err, userData){
  // console.log("Use data comin from server ",userData);
  if(err){
    console.log("error in finding");
  }
  res.send(userData);
});
});

Orguser_router.post('/:name',function (request, response) {

var newUser = new User({
  "name" : request.body.name,
  "email" : request.body.email,
  "password" : request.body.password,
  "role" : request.body.role
});
newUser.save(function(err, user){
  if(err) return console.error(err);
  // console.log("User = ",user);
});
// console.log("the saving data is here");
});

Orguser_router.put('/:name',function(req,res){

// console.log("update user ",req.body);
var editUser= req.body;
// console.log("edit user",editUser.name);
User.update({name : editUser.name},editUser,function(err,editUser){
  if(err){
    console.log("Updating failed:",err);
  }

});
});


module.exports = Orguser_router;
