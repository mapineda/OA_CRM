app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('login');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/app/components/login/_login.html',
				controller: 'loginCtrl'
			});
	}
]);