var mongoose = require( 'mongoose' );

var UserSchema  = mongoose.Schema({
  "name" : {type : String, required : true, trim: true, min:2 ,max : 50},
  "email" : {type : String, required : true, unique : true, index:true, trim: true},
  "password" : {type : String, required : true,min:8 ,max : 30},
  "orgsite" : {type : String, required : true, index:true, min:3 ,max : 50},
  "role" : {type : String, required : true, index:true}
});


//Instance Methods and Static Methods
// - for validation of data values
// - for validation of unique user in the system
// - for population of refs
// - password encryption & matching

UserSchema.methods = {
  validPassword: function(pwdPlainText) {
    return (pwdPlainText == this.password);
  }
};

//Create the model for user, collection name is given as "users"
var User = mongoose.model('user',
UserSchema,
"users"); //This is the collection name in the Database

module.exports = User;
