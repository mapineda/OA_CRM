app.factory('login', [
	'$http',
	'$window',
	function ($http, $window) {

		login = {};

		login.saveToken = function (token) {
			$window.localStorage['delta-crm-token'] = token;
		};

		login.getToken = function () {
			return $window.localStorage['delta-crm-token'];
		};

		login.logIn = function (user) {
			return $http.post('/users/login', user)
				.success(function (data) {
					login.saveToken(data.token);
				});
		};

		login.isLoggedIn = function () {
			var token = login.getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};


		login.currentUser = function () {
			if (login.isLoggedIn()) {
				var token = login.getToken();

				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload;
			}
		};

		login.logOut = function () {
			$window.localStorage.removeItem('delta-crm-token');
		};


		return login;
	}
]);