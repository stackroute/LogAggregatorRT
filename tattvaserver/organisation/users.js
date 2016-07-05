var mongoose = require( 'mongoose' );
var bCrypt = require('bcrypt-nodejs');

var UserSchema  = mongoose.Schema({
  "name" : {type : String, required : true, trim: true, min:2 ,max : 50},
  "email" : {type : String, required : true, unique : true, index:true, trim: true},
  "hash_password" : {type : String, required : true,min:8 ,max : 30},
  "orgsite" : {type : String, index:true, min:3 ,max : 50},
  "role" : {type : String, required : true, index:true}
},{collection: "users"});

//Instance Methods and Static Methods
// - for validation of data values
// - for validation of unique user in the system
// - for population of refs
// - password encryption & matching

// //virtuals
UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.hash_password = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

UserSchema.methods = {

	validPassword: function(plainText) {
		return bCrypt.compareSync(plainText, this.hash_password);
	},

	encryptPassword: function(plainText) {
		return bCrypt.hashSync(plainText, bCrypt.genSaltSync(10), null);
	},
};

//Create the model for user, collection name is given as "users"
// var User = mongoose.model('user',
// UserSchema,
// "users"); //This is the collection name in the Database

module.exports = UserSchema;
