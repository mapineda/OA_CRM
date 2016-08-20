var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	userId: {type: String, lowercase: true, unique: true},
	email: {type: String, unique: true},
	first: String,
	last: String,
	title: String,
	company: String,
	isAdmin: Boolean,
	hash: String,
	salt: String,
	history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }]
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

mongoose.model('User', UserSchema);