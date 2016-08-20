var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	first: String,
	last: String,
	access: {type: String, default: 'Public'},
	title: String,
	department: String,
	email: {type: String, unique: true},
	altEmail: String,
	phone: String,
	mobile: String,
	fax: String,
	street1: String,
	street2: String,
	city: String,
	state: String,
	zip: String,
	account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
	notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
},{strict: true});

mongoose.model('Contact', ContactSchema);