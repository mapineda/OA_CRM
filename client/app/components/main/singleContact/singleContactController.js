app.controller('singleContactCtrl', ['$scope', 'myContact', 'contact', 'login', 'user', function ($scope, myContact, contact, login, user) {
	$scope.myContact = myContact;
	$scope.currentUser = login.currentUser();

	$scope.addNote = function (text) {
		var myNote = {
			text: text,
			username: $scope.currentUser.username
		};


		contact.addNote($scope.myContact._id, myNote);
/* Add to log of history */
		var history = {};
		user.getIdByUsername($scope.currentUser.userId).then(function (id) {
			history = {
				message: 'Added note: '+myNote.text+' to contact: '+myContact.first+' '+myContact.last,
			};
			user.addToHistory(id, history);
		});
/*Add to log of history */
		$scope.myContact = contact.myContact;
		$scope.status.currentPage = 1;
		$scope.paginateNotes();
		$scope.status.text = '';
	};

/* Notes Pagination */
	//$scope.currentPage = 1;
	$scope.myLimit = 5;
	$scope.myStart = 0;

	$scope.paginateNotes = function () {
		$scope.myStart = ($scope.status.currentPage-1)*$scope.myLimit;
	};
/* Notes Pagination */

/* Accordian Section */
	$scope.oneAtATime = true;
  	$scope.status = {
  		text: '',
  		currentPage: 1,
  		totalItems: $scope.myContact.notes.length,
  		NotesOpen: true,
  		isCustomHeaderOpen: false,
    	isFirstOpen: true,
    	isFirstDisabled: false
  	};
/* Accordian Section */
}]);