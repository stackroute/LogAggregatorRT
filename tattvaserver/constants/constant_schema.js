var mongoose = require( 'mongoose' );

var constantsSchema = new mongoose.Schema({
	"con_name": {type: String, unique:true, required:true},
	"value": {type: String, unique:true, required:true},
	"Descr": {type: String}
},{collection: "constants"});

module.exports = constantsSchema;