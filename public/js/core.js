var testParent = angular.module('testParent', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all parents and show them
	$http.get('/api/parents')
		.success(function(data) {
			$scope.parents = data;
			console.log(data);
		})
		.success(function(data2) {
			$scope.parents2 = data2;
			console.log(data2);
		})
		.success(function(data3) {
			$scope.parents3 = data3;
			console.log(data3);
		})
		.success(function(data4) {
			$scope.parents4 = data4;
			console.log(data4);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createParent = function() {
		$http.post('/api/parents', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.parents = data;
				console.log(data);
		})
		$http.post('/api/parents', $scope.formData2)
			.success(function(data2) {
				$scope.formData2 = {};
				$scope.parents2 = data2;
				console.log(data);
		})
			$http.post('/api/parents', $scope.formData3)
			.success(function(data3) {
				$scope.formData3 = {};
				$scope.parents3 = dat3;
				console.log(data3);
		})
			$http.post('/api/parents', $scope.formData4)
			.success(function(data4) {
				$scope.formData4 = {};
				$scope.parents4 = data4;
				console.log(data4);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// delete a todo after checking it
	$scope.deleteParent = function(id) {
		$http.delete('/api/parents/' + id)
		.success(function(data) {
			$scope.parents = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
}