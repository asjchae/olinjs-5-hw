var mongoose = require('mongoose');

var FacebookUserSchema = mongoose.Schema({
	FBID: String,
	background: String
});

var FacebookUser = mongoose.model('FacebookUser', FacebookUserSchema);

module.exports = FacebookUser;