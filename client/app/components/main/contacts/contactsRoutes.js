app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
			.state('contacts', {
				url: '/main/contacts',
				templateUrl: '/app/components/main/contacts/_contacts.html',
				controller: 'contactsCtrl',
				resolve: {
					contactsCountPromise: ['contact', function (contact) {
						return contact.initialize();
					}],
					accountPromise: ['account', function (account) {
						return account.getAll();
					}],
					userPromise: ['user', function (user) {
						return user.getAll();
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