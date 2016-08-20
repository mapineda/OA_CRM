app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
			.state('users', {
				url: '/admin/users',
				templateUrl: '/app/components/admin/users/_users.html',
				controller: 'usersCtrl',
				resolve: {
					userPromise: ['user', function (user) {
						return user.initialize();
					}]
				},
				onEnter: [
					'$state',
					'login',
					function ($state, login) {
						if (!login.isLoggedIn()) {
							$state.go('login');
						}
					}]
			});
	}
]);