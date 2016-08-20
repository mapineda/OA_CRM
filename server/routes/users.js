var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var http = require('http');

var User = mongoose.model('User');
var History = mongoose.model('History');

// Middleware to check if user is authenticated
var auth = function (req, res, next) {
	if (!req.query.token){
    	return res.status(401).json({error: 'web token must be provided'});
  	}
	var tokenDecrypt = {
		host: '10.1.10.209',
		port: 80,
		path: '/tokenDecrypt?token='+req.query.token
	};

	http.get(tokenDecrypt, function(response) {
		// Continuously update stream with data
		var body = '';
		response.on('data', function(d) {
			body += d;
		});
		response.on('end', function() {
			// Data reception is done, do whatever with it!
			//console.log(body.success);
			var parsed = JSON.parse(body);
			if (parsed.success === false) {
				return res.status(401).json({error: 'authorization failed due to an invalid web token'});
			}
			req.tokenInfo = parsed;
			return next();
		});
	});

};

//Middleware to check if authenticated user is an admin
var admin = function (req, res, next) {
	User.findOne({userId: req.tokenInfo.userId}, function (err, user) {
		if (err) { return next(err); }
		if (!user.isAdmin) {
			return res.status(401).json({error: 'This route requires admin access'});
		}
		return next();
	});
};

/* GET (RETRIEVE) all users */
router.get('/', auth, function (req, res, next) {
	User.find(null, null, {
		skip: parseInt(req.query.skip),
		limit: parseInt(req.query.limit)
	}, function (err, users) {
		if (err) { return next(err); }
		res.json(users);
	});
});

/* GET (RETRIEVE) count of users */
router.get('/count', function (req, res, next) {
	User.find().count(function (err, count) {
		if (err) { return next(err); }
		res.json(count);
	});
});


/* POST (CREATE) a user */
router.post('/', auth, admin, function (req, res, next) {
	if (!req.body.userId || !req.body.pw) {
		return res.status(400).json({
			message: 'Please fill out all fields'
		});
	}

	var user = new User();

	user.userId = req.body.userId;
	user.first = req.body.first;
	user.last = req.body.last;
	user.email = req.body.email;
	user.title = req.body.title;
	user.company = req.body.company;
	user.isAdmin = req.body.isAdmin;

	user.setPassword(req.body.pw);

	User.find({email: req.body.email}).count(function (err, count) {
		if (!count) {
			user.save(function (err) {
				if (err) { return next(err); }

				return res.json({msg: 'created'});
			});
		}
		else {
		    // Handle err.
		    res.status(400).json({message: 'User with e-mail address '+req.body.email+' already exists.  Each user must have a unique e-mail address.'});
		}
	});


});

/* PRELOAD "User" Object */
router.param('user', function (req, res, next, id) {
	var query = User.findById(id);

	query.exec(function (err, user) {
		if (err) { return next(err); }
		if (!user) { return next(new Error('can\'t find user')); }

		req.user = user;
		return next();
	});
});

/* PRELOAD "User" Object by username*/
router.param('username', function (req, res, next, username) {
	var query = User.find({userId: username});

	query.exec(function (err, username) {
		if (err) { return next(err); }
		if (!username) { return next(new Error('can\'t find user')); }

		req.username = username;
		return next();
	});
});

/* GET (RETRIEVE) a single user by username */
router.get('/:username', auth, admin, function (req, res, next) {

	res.json(req.username);

});


/* GET (RETRIEVE) a single user */
router.get('/:user', auth, admin, function (req, res, next) {


	req.user.populate('history', function(err, user) {
		if (err) { return next(err); }

		res.json(req.user);
	});
});



/* POST (CREATE) a history */
router.post('/:user/history', auth, function (req, res, next) {

	var history = new History(req.body);
	history.userId = req.user;

	history.save(function (err, history) {
		if (err) { return next(err); }

		req.user.history.push(history);

		req.user.save(function (err, user) {
			if (err) { return next(err); }
				res.json(history);
			});
	});

});

/**************************/
/* DELETE a user */
/**************************/
router.delete('/:user', auth, admin, function (req, res, next) {

	// Remove user using mongoose remove method
	req.user.remove(function (err, user) {
		// Return any errors
		if (err) { return next(err); }

		// Query db using mongoose find method
		User.find( function (err, users) {
			// Return any errors
			if (err) { return next(err); }
			// If there are no errors, return the list of users
			return res.json(users);
		});
	});
});

/************************/
/* UPDATE a user */
/************************/
router.put('/:user', auth, admin, function (req, res, next) {

	User.findById(req.user._id, function (err, user) {

		// Update userId if set in form
		if (req.body.userId) { user.userId = req.body.userId; }

		// Update first if set in form
		if (req.body.first) { user.first = req.body.first; }

		// Update last if set in form
		if (req.body.last) { user.last = req.body.last; }

		// Update e-mail if set in form
		if (req.body.email) { user.email = req.body.email; }

		// Update title if set in form
		if (req.body.title) { user.title = req.body.title; }

		// Update company if set in form
		if (req.body.company) { user.company = req.body.company; }

		// Update isAdmin if set in form
		if (req.body.isAdmin) { user.isAdmin = req.body.isAdmin; }

		// Save changes to user using the mongoose save method
		user.save(function (err) {
			// Return any errors
			if (err) { return next(err); }

			User.find( function (err, users) {
				if (err) { return next(err); }
				res.json(users);
			});
		});
	});
});


router.post('/login', function (req, res, next) {
	if (!req.body.userId || !req.body.pw) {
		return res.status(400).json({
			message: 'Please fill out all fields'
		});
	}

	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }
		if (user) {

			var tokenAuthority = {
				host: '10.1.10.209',
				port: 80,
				path: '/token?userId='+user.userId+'&username='+user.first+'%20'+user.last+'&isAdmin='+user.isAdmin
			};

			http.get(tokenAuthority, function(response) {
			        // Continuously update stream with data
			        var body = '';
			        response.on('data', function(d) {
			            body += d;
			        });
			        response.on('end', function() {

			            // Data reception is done, do whatever with it!
			            var parsed = JSON.parse(body);
			            return res.json(parsed);
			        });
			    });

		} else {

			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;
