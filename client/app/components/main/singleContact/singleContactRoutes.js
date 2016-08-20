app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('dashboard');

		$stateProvider
			.state('singleContact', {
				url: '/main/singleContact/{id}',
				templateUrl: '/app/components/main/singleContact/_singleContact.html',
				controller: 'singleContactCtrl',
				resolve: {
					myContact: [
						'$stateParams',
						'contact',
						function ($stateParams, contact) {
							return contact.get($stateParams.id);
						}
					]
				},
				onEnter: [
					'$state',
					'login',
					'myContact',
					'user',
					function ($state, login, myContact, user) {
						if (!login.isLoggedIn()) {
							$state.go('login');
						}

						var currentUser = login.currentUser();
						var history = {};
						user.getIdByUsername(currentUser.userId).then(function (id) {
							history = {
								message: 'viewed contact '+myContact.first+' '+myContact.last,
							};
							user.addToHistory(id, history);
						});
					}]
			});
	}
]);