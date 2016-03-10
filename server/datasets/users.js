var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	email: {type: String, unique: true},
	username: String,
	password: String,
	image: String,
	bio: String,
	following:[{userId:String}],
	followers:[{userId:String}]
});