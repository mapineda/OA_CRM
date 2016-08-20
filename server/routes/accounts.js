var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Account = mongoose.model('Account');
var Contact = mongoose.model('Contact');

/* GET (RETRIEVE) all users */
router.get('/', function (req, res, next) {
	Account.find( function (err, accounts) {
		if (err) { return next(err); }
		res.json(accounts);
	});
});

/* POST (CREATE) an account */
router.post('/', function (req, res, next) {

	var account = new Account(req.body);

	account.save(function (err, account) {
		if (err) { return next(err); }

		return res.json(account);
	});
});

/* PRELOAD "Account" Object */
router.param('account', function (req, res, next, id) {
	var query = Account.findById(id);

	query.exec(function (err, account) {
		if (err) { return next(err); }
		if (!account) { return next(new Error('can\'t find account')); }

		req.account = account;
		return next();
	});
});

/* GET (RETRIEVE) accounts along with userId and assignedTo and contacts */
router.get('/:account', function (req, res, next) {
	req.account.populate('userId', function(err, account) {
		if (err) { return next(err); }

		req.account.populate('assignedTo', function (err, account) {
			if (err) { return next(err); }

			req.account.populate('contacts', function (err, account) {
				if (err) { return next(err); }

				res.json(account);
			});
		});

	});
});

/* POST (CREATE) a contact */
router.post('/:account/contacts', function (req, res, next) {

	var contact = new Contact(req.body);
	contact.account = req.account;

	Contact.find({email: req.body.email}).count(function (err, count) {
		if (!count) {
			contact.save(function (err, contact) {
				if (err) { return next(err); }

				req.account.contacts.push(contact);
				req.account.save(function (err, account) {
					if (err) { return next(err); }
					res.json(contact);
				});
			});
		}
		else {
		    // Handle err.
		    res.status(400).json({message: 'Contact with e-mail address '+req.body.email+' already exists.  Each contact must have a unique e-mail address.'});
		}
	});


});

/**************************/
/* DELETE an account */
/**************************/
router.delete('/:account', function (req, res, next) {

	// Remove account using mongoose remove method
	req.account.remove(function (err, account) {
		// Return any errors
		if (err) { return next(err); }

		// Query db using mongoose find method
		Account.find( function (err, accounts) {
			// Return any errors
			if (err) { return next(err); }
			// If there are no errors, return the list of accounts
			return res.json(accounts);
		});
	});
});

/************************/
/* UPDATE an account */
/************************/
router.put('/:account', function (req, res, next) {

	Account.findById(req.account._id, function (err, account) {

		// Update userId if set in form
		if (req.body.userId) { account.userId = req.body.userId; }

		// Update assignedTo if set in form
		if (req.body.assignedTo) { account.assignedTo = req.body.assignedTo; }

		// Update name if set in form
		if (req.body.name) { account.name = req.body.name; }

		// Update access if set in form
		if (req.body.access) { account.access = req.body.access; }

		// Update tollFreePhone if set in form
		if (req.body.tollFreePhone) { account.tollFreePhone = req.body.tollFreePhone; }

		// Update phone if set in form
		if (req.body.phone) { account.phone = req.body.phone; }

		// Update fax if set in form
		if (req.body.fax) { account.fax = req.body.fax; }

		// Update category if set in form
		if (req.body.category) { account.category = req.body.category; }

		// Save changes to account using the mongoose save method
		account.save(function (err) {
			// Return any errors
			if (err) { return next(err); }

			Account.find( function (err, accounts) {
				if (err) { return next(err); }
				res.json(accounts);
			});
		});
	});
});

module.exports = router;