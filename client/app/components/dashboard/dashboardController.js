app.controller('dashboardCtrl', ['$scope', 'user', function ($scope, user) {
/* Notes Pagination */
	$scope.myRecentActivityLimit = 5;
	$scope.myRecentActivityStart = 0;

	$scope.paginateRecentActivity = function () {
		$scope.myRecentActivityStart = ($scope.status.recentActivityCurrentPage-1)*$scope.myRecentActivityLimit;
	};
/* Notes Pagination */
/* Accordian Section */
	$scope.oneAtATime = true;
  	$scope.status = {
  		history: user.history,
  		recentActivityCurrentPage: 1,
  		activityOpen: true,
  		isCustomHeaderOpen: false,
    	isFirstOpen: true,
    	isFirstDisabled: false
  	};
/* Accordian Section */

}]);