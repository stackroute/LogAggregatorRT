angular.module('tattva')
.controller('viewController',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){

$scope.flag=true;

  $scope.editStream = {
  	"namespace": "apacheTomcat",
  	"instance": "ap_instance",
  	"streamname": "stream-1a",
  	"description": "This is apache stream",
    "query": [{
  			"field": "response code",
  			"operator": "==",
  			"value": "200"
  		}]
    }
}]);

$scope.editFlag = function(){

	$scope.flag=false;

};
