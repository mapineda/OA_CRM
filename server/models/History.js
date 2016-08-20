var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	timestamp: { type: Date, default: Date.now },
	message: String
});

mongoose.model('History', HistorySchema);