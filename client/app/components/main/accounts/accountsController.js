app.controller('accountsCtrl', ['$scope', 'account', function ($scope, account) {
	$scope.accounts = account.accounts;
}]);