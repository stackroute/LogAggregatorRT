var dataApp = angular.module('dataApp', ['ui.bootstrap', 'ngRoute']);

dataApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/data1', {
		templateUrl: '/partials/data1.html',
		controller: 'data_1_Ctrlr'
	}).
	when('/data2', {
		templateUrl: '/partials/data2.html',
		controller: 'data_2_Ctrlr'
	}).
	when('/data3', {
		templateUrl: '/partials/data3.html',
		controller: 'data_3_Ctrlr'
	}).
	when('/data4', {
		templateUrl: '/partials/data4.html',
		controller: 'data_4_Ctrlr'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

dataApp.controller('data_1_Ctrlr', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		//Your controller code goes here
		$scope.loadData = function() {
			$http.get('/data1').then(function(response){ $scope.data = response.data; });
		}
		$scope.loadData();
	}
]);

dataApp.controller('data_2_Ctrlr', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		//Your controller code goes here
		$scope.loadData = function() {
			$http.get('/data2').then(function(response){ $scope.data = response.data; });
		}
		$scope.loadData();
	}
]);

dataApp.controller('data_3_Ctrlr', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		//Your controller code goes here
		$scope.loadData = function() {
			$http.get('/data3').then(function(response){ $scope.data = response.data; });
		}
		$scope.loadData();
	}
]);

dataApp.controller('data_4_Ctrlr', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		//Your controller code goes here
		$scope.loadData = function() {
			$http.get('/data4').then(function(response){ $scope.data = response.data; });
		}
		$scope.loadData();
	}
]);
