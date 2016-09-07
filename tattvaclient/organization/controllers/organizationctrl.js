angular.module('tattva')
.controller('orgCtrl',['$scope','$mdDialog','$http','AuthService','userservice','$filter', function($scope, $mdDialog, $http,AuthService, userservice,$filter) {
	var data = userservice.getUserName(data);
	$scope.org = AuthService.getCurrentUser();
	$scope.currentPage = 0;
	$scope.pageSize = 5;
	$scope.user = [];
	$scope.q = '';
	//$scope.srchctrlvar="search";
	// $scope.srchclr=function(){
	// 	$scope.showSearch = !$scope.showSearch;
	// 	$scope.srchctrlvar= ($scope.srchctrlvar=="clear")?"search":"clear";
	// }
	$scope.org = AuthService.getCurrentUser();
	$scope.loadData = function() {
		userservice.getUserName().then(function(response){
			$scope.user = response;
			$scope.getData = function() {
				return $filter('filter')($scope.user, $scope.q)
			}

			$scope.numberOfPages = function() {
				return Math.ceil($scope.getData().length / $scope.pageSize);
			}	
		});
	}
	$scope.loadData();

	$scope.showConfirm = function(index) {
		$mdDialog.show({
			templateUrl:'organization/views/userDetailsDialog.html',
			locals: {
				user: $scope.user,
				index:index
			},
			controller: DialogController
		});
		function DialogController($scope, userservice,$mdDialog, user,index) {
			$scope.user = user;
			console.log($scope.user);
			$scope.editUser=function(){
					var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password,role : $scope.user.role};
					console.log(userData);
					$scope.editUser(userData);
				$state.go('tattva.organisation');
			}
			$scope.index=index;
			$scope.closeDialog = function() {
				$mdDialog.hide();
			}
		}
	}
}]);