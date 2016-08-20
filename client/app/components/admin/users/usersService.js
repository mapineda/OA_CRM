app.factory('user', [
	'$http',
	'$state',
	'login',
	function ($http, $state, login) {
		var user = {
			users: [],
			myUser: {},
			history: [],
			skip: 0,
			limit: 5,
			count: 0
		};

		user.initialize = function () {
			user.getCount();
			user.getAll();

		};

		user.getAll = function () {
			return $http.get('/users?skip='+user.skip+'&limit='+user.limit+'&token='+login.getToken())
				.success(function (data) {
					angular.copy(data, user.users);
				});
		};

		user.getHistory = function (myId) {
			return $http.get('/history?_id='+myId+'&token='+login.getToken())
				.success(function (data) {
					angular.copy(data, user.history);
				});
		};

		user.getCount = function () {
			return $http.get('/users/count?token='+login.getToken())
				.success(function (data) {
					user.count = data;
				});
		};

		user.updateUser = function (user) {
			return $http.put('/users/' + user._id + '?token='+login.getToken(), user)
				.success(function (data) {
					angular.copy(data, user.users);
				});
		};

		user.getIdByUsername = function (username) {
			return $http.get('/users/' + username + '?token='+login.getToken())
				.then(function (res) {
					//console.log(res.data[0]._id);
					return res.data[0]._id;
				});
		};

		user.createUser = function (myUser) {
			return $http.post('/users?token='+login.getToken(), myUser)
				.success(function (data) {
					user.getAll();
				});
		};

		user.deleteUser = function (myUser) {
			return $http.delete('/users/' + myUser._id + '?token='+login.getToken(), myUser)
				.success(function (data) {
					angular.copy(data, user.users);
					if (user.userId === login.currentUser().userId) {
						login.logOut();
						$state.go('login');
					} else {
						user.getAll();
					}
				});
		};

		user.addToHistory = function (myId, history) {
			return $http.post('/users/'+myId+'/history?token='+login.getToken(), history)
				.success(function (data) {
					//console.log(data);
				});
		};

		user.subtractCount = function () {
			user.count-=1;
		};

		user.addCount = function () {
			user.count+=1;
		};

		return user;
	}
]);