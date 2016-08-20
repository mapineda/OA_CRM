var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Account = mongoose.model('Account');
var Contact = mongoose.model('Contact');
var Note = mongoose.model('Note');

/* GET (RETRIEVE) all contacts */
router.get('/', function (req, res, next) {
	Contact.find().skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort('last').populate('account').exec(function (err, contacts) {
		res.json(contacts);
	});
});

/* GET (RETRIEVE) count of contacts */
router.get('/count', function (req, res, next) {
	Contact.find().count(function (err, count) {
		if (err) { return next(err); }
		res.json(count);
	});
});



/* PRELOAD "Contact" Object */
router.param('contact', function (req, res, next, id) {
	var query = Contact.findById(id);

	query.exec(function (err, contact) {
		if (err) { return next(err); }
		if (!contact) { return next(new Error('can\'t find contact')); }

		req.contact = contact;
		return next();
	});
});

/* GET (RETRIEVE) contacts along with userId and assignedTo */
router.get('/:contact', function (req, res, next) {
	req.contact.populate('userId', function(err, contact) {
		if (err) { return next(err); }

		req.contact.populate('assignedTo', function (err, contact) {
			if (err) { return next(err); }

			req.contact.populate('account', function (err, contact) {
				if (err) { return next(err); }

				req.contact.populate('notes', function (err, contact) {
					if (err) { return next(err); }

					res.json(contact);
				});

			});
		});

	});
});

/**************************/
/* DELETE a contact */
/**************************/
router.delete('/:contact', function (req, res, next) {

	// Remove contact using mongoose remove method
	req.contact.remove(function (err, contact) {
		// Return any errors
		if (err) { return next(err); }

			console.log('Account='+req.contact.account);
			console.log('Contact='+req.contact._id);


		var accountId = new mongoose.Types.ObjectId(req.contact.account._id);
		var contactId = new mongoose.Types.ObjectId(req.contact._id);
		Account.findById(req.contact.account, function (err, account) {
			if (err) { return next(err); }
			account.contacts.pull(contactId);
			account.save(function (err) {
				if (err) { return next(err); }
			});
		});

		// Query db using mongoose find method
		Contact.find( function (err, contacts) {
			// Return any errors
			if (err) { return next(err); }
			// If there are no errors, return the list of contacts
			return res.json(contacts);
		});
	});
});

/************************/
/* UPDATE a contact */
/************************/
router.put('/:contact', function (req, res, next) {

	Contact.findById(req.contact._id, function (err, contact) {

		// Update userId if set in form
		if (req.body.userId) { contact.userId = req.body.userId; }

		// Update assignedTo if set in form
		if (req.body.assignedTo) { contact.assignedTo = req.body.assignedTo; }

		// Update first if set in form
		if (req.body.first) { contact.first = req.body.first; }

		// Update last if set in form
		if (req.body.last) { contact.last = req.body.last; }

		// Update access if set in form
		if (req.body.access) { contact.access = req.body.access; }

		// Update title if set in form
		if (req.body.title) { contact.title = req.body.title; }

		// Update department if set in form
		if (req.body.department) { contact.department = req.body.department; }

		// Update email if set in form
		if (req.body.email) { contact.email = req.body.email; }

		// Update alternate e-mail if set in form
		if (req.body.altEmail) { contact.altEmail = req.body.altEmail; }

		// Update phone if set in form
		if (req.body.phone) { contact.phone = req.body.phone; }

		// Update mobile if set in form
		if (req.body.mobile) { contact.mobile = req.body.mobile; }

		// Update fax if set in form
		if (req.body.fax) { contact.fax = req.body.fax; }

		// Update street1 if set in form
		if (req.body.street1) { contact.street1 = req.body.street1; }

		// Update street2 if set in form
		if (req.body.street2) { contact.street2 = req.body.street2; }

		// Update city if set in form
		if (req.body.city) { contact.city = req.body.city; }

		// Update state if set in form
		if (req.body.state) { contact.state = req.body.state; }

		// Update zip if set in form
		if (req.body.zip) { contact.zip = req.body.zip; }

		// Update account if set in form
		if (req.body.account) { contact.account = req.body.account; }


		// Save changes to contact using the mongoose save method
		contact.save(function (err) {
			// Return any errors
			if (err) { return next(err); }

			Contact.find( function (err, contacts) {
				if (err) { return next(err); }
				res.json(contacts);
			});
		});
	});
});


/* POST (CREATE) a note */
router.post('/:contact/notes', function (req, res, next) {

	var note = new Note(req.body);
	note.contact = req.contact;

	note.save(function (err, note) {
		if (err) { return next(err); }

			req.contact.notes.push(note);
			req.contact.save(function (err, contact) {
			if (err) { return next(err); }
				res.json(note);
			});
	});

});

module.exports = router;