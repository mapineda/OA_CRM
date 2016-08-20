app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
			.state('accounts', {
				url: '/main/accounts',
				templateUrl: '/app/components/main/accounts/_accounts.html',
				controller: 'accountsCtrl',
				resolve: {
					accountsPromise: ['account', function (account) {
						return account.getAll();
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