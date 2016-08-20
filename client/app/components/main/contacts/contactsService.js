app.factory('contact', ['$http', function ($http) {
	var contact = {
		contacts: [],
		myContact: {},
		skip: 0,
		limit: 5,
		count: 0
	};



	contact.initialize = function () {
		contact.getCount();
		contact.getAll();

	};

	contact.getAll = function () {
		return $http.get('/contacts?skip='+contact.skip+'&limit='+contact.limit+'&token='+login.getToken())
			.success(function (data) {
				angular.copy(data, contact.contacts);
		});
	};

	contact.deleteContact = function (myContact) {
		return $http.delete('/contacts/' + myContact._id + '?token='+login.getToken(), myContact)
			.success(function (data) {
				angular.copy(data, contact.contacts);
				contact.getAll();
			});
	};

	contact.createContact = function (myContact) {
		return $http.post('/accounts/'+myContact.account._id+'/contacts?token='+login.getToken(), myContact)
			.success(function (data) {
				contact.getAll();
			});
	};


	contact.updateContact = function (contact) {
		return $http.put('/contacts/' + contact._id + '?token='+login.getToken(), contact)
			.success(function (data) {
				angular.copy(data, contact.contacts);
			});
	};

	contact.getCount = function () {
		return $http.get('/contacts/count?token='+login.getToken())
			.success(function (data) {
				contact.count = data;
			});
	};

	contact.subtractCount = function () {
		contact.count-=1;
	};

	contact.addCount = function () {
		contact.count+=1;
	};

	contact.get = function (id) {
		return $http.get('/contacts/' + id + '?token='+login.getToken())
			.then(function (res) {
				return res.data;
			});
	};

	contact.addNote = function (id, note) {
		return $http.post('/contacts/'+id+'/notes?token='+login.getToken(), note)
			.success(function (data) {
				contact.get(id).then(function (con) {
					angular.copy(con, contact.myContact);
				});
			});
	};

	return contact;
}]);