var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	name: String,
	access: String,
	tollFreePhone: String,
	phone: String,
	fax: String,
	category: String,
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact', unique: true}]
});

mongoose.model('Account', AccountSchema);