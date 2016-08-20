var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var History = mongoose.model('History');

/* GET (RETRIEVE) all histories */
router.get('/', function (req, res, next) {
	History.find({userId: req.query._id}).limit(100).sort('-timestamp').populate('userId').exec(function (err, histories) {
		res.json(histories);
	});
});

module.exports = router;