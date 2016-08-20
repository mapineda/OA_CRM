app.factory('account', ['$http', function ($http) {
	var account = {
		accounts: []
	};

	account.getAll = function () {
		return $http.get('/accounts?token='+login.getToken())
			.success(function (data) {
				angular.copy(data, account.accounts);
		});
	};


	return account;
}]);