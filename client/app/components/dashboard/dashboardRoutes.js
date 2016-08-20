app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('login');

		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: '/app/components/dashboard/_dashboard.html',
				controller: 'dashboardCtrl',
				resolve: {
					userHistoryPromise: ['login', 'user', function (login, user) {
						var currentUser = login.currentUser();
						user.getIdByUsername(currentUser.userId).then(function (id) {
							return user.getHistory(id);
						});
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