app.controller('loginCtrl', ['$scope', '$state', 'login', 'user', function ($scope, $state, login, user) {
	$scope.user = {};

	$scope.logIn = function() {
		login.logIn($scope.user)
			.error(function (error) {
				$scope.error = error;
			}).then(function () {
			/* Add to log of history */
				$scope.currentUser = login.currentUser();
				var history = {};
				user.getIdByUsername($scope.currentUser.userId).then(function (id) {
					history = {
						message: 'signed in',
					};
					user.addToHistory(id, history);
				});
			/* Add to log of history */
				$state.go('dashboard');
			});
	};
}]);