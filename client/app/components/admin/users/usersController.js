app.controller('usersCtrl', ['$scope', 'user', 'login', function ($scope, user, login) {
	$scope.users = user.users;
	$scope.showUser = false;

	$scope.updateUser = function (myUser) {
	/* Add to log of history */
		var currentUser = login.currentUser();
		var history = {};
		user.getIdByUsername(currentUser.userId).then(function (id) {
			history = {
				message: 'updated user: '+myUser.userId,
			};
			user.addToHistory(id, history);
			user.updateUser(myUser);
		});
	/* Add to log of history */
	};

	$scope.searchFunction = function () {
		if (!$scope.search || $scope.search === '') {
			$scope.totalItems = user.count;
			$scope.itemsPerPage = 5;
			$scope.currentPage = 1;
			$scope.getAll = function() {
				user.limit = $scope.itemsPerPage;
				user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
				user.getAll();
				//console.log({skip: contact.skip, limit: contact.limit});
			};
		} else {
			$scope.totalItems = user.count;
			$scope.itemsPerPage = user.count;
			$scope.currentPage = 1;
			$scope.getAll = function() {
				user.limit = $scope.itemsPerPage;
				user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
				user.getAll();
				//console.log({skip: contact.skip, limit: contact.limit});
			};
		}

	};

	$scope.deleteUser = function (myUser) {
	/* Add to log of history */
		var currentUser = login.currentUser();
		var history = {};
		user.getIdByUsername(currentUser.userId).then(function (id) {
			history = {
				message: 'deleted user: '+myUser.userId,
			};
			user.addToHistory(id, history);
			user.deleteUser(myUser);
			user.subtractCount();
			$scope.totalItems = user.count;
			$scope.currentPage = 1;
			user.limit = $scope.itemsPerPage;
			user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
			user.getAll();
			//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});
		});
	/* Add to log of history */

	};

	$scope.createUser = function () {

		if (!$scope.insertUser.pw || $scope.insertUser.pw !== $scope.insertUser.pwConfirm) {
			$scope.error = {
				message: 'Password does not match confirmation'
			};
			return;
		}


		user.createUser($scope.insertUser).error(function (err) {
			$scope.error = err;
		}).success(function () {
		/* Add to log of history */
			var currentUser = login.currentUser();
			var history = {};
			user.getIdByUsername(currentUser.userId).then(function (id) {
				history = {
					message: 'created user: '+$scope.insertUser.userId,
				};
				user.addToHistory(id, history);
				$scope.insertUser = {};
			});
		/* Add to log of history */
			user.addCount();
			$scope.totalItems = user.count;
			$scope.currentPage = 1;
			user.limit = $scope.itemsPerPage;
			user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
			user.getAll();
			//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});

			$scope.showUser = false;
		});


	};

	$scope.setShowUser = function () {
		if ($scope.showUser === false) { $scope.showUser = true; } else { $scope.showUser = false; }
	};

/* Pagination */

	$scope.totalItems = user.count;
	$scope.itemsPerPage = 5;
	$scope.currentPage = 1;
	$scope.getAll = function() {
		user.limit = $scope.itemsPerPage;
		user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
		user.getAll();
		//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});
	};
	$scope.getAll2 = function() {
		$scope.currentPage = 1;
		user.limit = $scope.itemsPerPage;
		user.skip = (user.limit*$scope.currentPage-$scope.itemsPerPage);
		user.getAll();
		//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});
	};

	$scope.subtractCount = function () {
		user.subtractCount();
		//console.log({currentPage: $scope.currentPage, skip: user.skip, limit: user.limit, count: user.count});
	};
	$scope.itemSelector = [5, 10, 20, 30, 50];
/* Pagination */




}]);