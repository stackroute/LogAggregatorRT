angular.module('tattva')
.controller("dataschemaNamespaceCtrl", ["$scope", "$mdDialog","dataSchema", function($scope, $mdDialog,dataSchema){

	$scope.dataSchema=dataSchema;
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
}]);