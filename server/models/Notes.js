var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	username: String,
	text: String,
	added: { type: Date, default: Date.now },
	contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }
},{strict: true});

mongoose.model('Note', NoteSchema);