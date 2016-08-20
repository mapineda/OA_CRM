app.controller('navCtrl', ['$scope', '$state', 'login', 'user', function ($scope, $state, login, user) {
	$scope.isCollapsed = true;

	$scope.collapse = function () {
		$scope.isCollapsed = true;
	};

	$scope.adminMenuItems = [
		{
			pageName: 'Users',
			link: '/#/admin/users'
		},
		{
			pageName: 'Groups',
			link: '/#/admin/groups'
		}
	];

	$scope.mainMenuItems = [
		{
			pageName: 'Accounts',
			link: '/#/main/accounts'
		},
		{
			pageName: 'Contacts',
			link: '/#/main/contacts'
		}
	];

	$scope.isLoggedIn = login.isLoggedIn;
	$scope.currentUser = login.currentUser;
	$scope.isAdmin = function () {
		if ($scope.isLoggedIn()) {
			var admin = $scope.currentUser();
			if (admin.isAdmin === 'true') {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	$scope.logOut = function () {
	/* Add to log of history */
		var currentUser = login.currentUser();
		var history = {};
		user.getIdByUsername(currentUser.userId).then(function (id) {
			history = {
				message: 'signed out',
			};
			user.addToHistory(id, history);
			login.logOut();
			$state.go('login');
		});
	/* Add to log of history */
		
	};
}]);