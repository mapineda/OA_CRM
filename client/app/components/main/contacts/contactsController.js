app.controller('contactsCtrl', ['$scope', 'contact', 'account', 'user', function ($scope, contact, account, user) {
	$scope.contacts = contact.contacts;
	$scope.contact = {};
	$scope.accounts = account.accounts;
	$scope.users = user.users;
	$scope.permissions = ['Private', 'Public'];
	$scope.showContact = false;
	$scope.editContact = false;
	$scope.createContact = false;

	$scope.searchFunction = function () {
		if (!$scope.search || $scope.search === '') {
			$scope.totalItems = contact.count;
			$scope.itemsPerPage = 5;
			$scope.currentPage = 1;
			$scope.getAll = function() {
				contact.limit = $scope.itemsPerPage;
				contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
				contact.getAll();
				//console.log({skip: contact.skip, limit: contact.limit});
			};
		} else {
			$scope.showContact = false;
			$scope.editContact = false;
			$scope.createContact = false;
			$scope.totalItems = contact.count;
			$scope.itemsPerPage = contact.count;
			$scope.currentPage = 1;
			$scope.getAll = function() {
				contact.limit = $scope.itemsPerPage;
				contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
				contact.getAll();
				//console.log({skip: contact.skip, limit: contact.limit});
			};
		}

	};

	$scope.anyContacts = function () {
		if (contact.count > 0) { return true; } else { return false; }
	};

	$scope.setShowContact = function () {
		if ($scope.showContact === false) { $scope.showContact = true; $scope.createContact = true; } else { $scope.showContact = false; $scope.createContact = false;}
	};

	$scope.showEditContact = function (contact) {
		$scope.contact = contact;
		$scope.showContact = true;
		$scope.createContact = false;
		$scope.editContact = true;
	};

	$scope.createContactFunction = function () {
		if (!$scope.contact.first || $scope.contact.first === '') {
			$scope.error = {
				message: 'You must enter a first name for this contact.'
			};
			return;
		} else if (!$scope.contact.last || $scope.contact.last === '') {
			$scope.error = {
				message: 'You must enter a last name for this contact.'
			};
			return;
		} else if (!$scope.contact.account || $scope.contact.account === '') {
			$scope.error = {
				message: 'You must enter an account for this contact.'
			};
			return;
		}

		contact.createContact($scope.contact).error(function (err) {
			$scope.error = err;
		}).success(function () {
			contact.addCount();
			$scope.totalItems = contact.count;
			$scope.currentPage = 1;
			contact.limit = $scope.itemsPerPage;
			contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
			contact.getAll();
			//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});


		});

		$scope.contact = {};
		$scope.showContact = false;

	};

	$scope.updateContact = function () {
		contact.updateContact($scope.contact);
		$scope.contact = {};
		$scope.showContact = false;
		$scope.editContact = false;
		$scope.createContact = false;
	};


	$scope.deleteContact = function (myContact) {
		contact.deleteContact(myContact);
		contact.subtractCount();
		$scope.totalItems = contact.count;
		$scope.currentPage = 1;
		contact.limit = $scope.itemsPerPage;
		contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
		contact.getAll();
		//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});
	};

	$scope.cancelContactCreate = function () {
		$scope.contact = {};
		$scope.showContact = false;
		$scope.editContact = false;
		$scope.createContact = false;
	};

/* Pagination */

	$scope.totalItems = contact.count;
	$scope.itemsPerPage = 5;
	$scope.currentPage = 1;
	$scope.getAll = function() {
		contact.limit = $scope.itemsPerPage;
		contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
		contact.getAll();
		//console.log({skip: contact.skip, limit: contact.limit});
	};
	$scope.getAll2 = function() {
		$scope.currentPage = 1;
		contact.limit = $scope.itemsPerPage;
		contact.skip = (contact.limit*$scope.currentPage-$scope.itemsPerPage);
		contact.getAll();
		//console.log({skip: contact.skip, limit: contact.limit});
	};
	$scope.itemSelector = [5, 10, 20, 30, 50];
/* Pagination */

}]);