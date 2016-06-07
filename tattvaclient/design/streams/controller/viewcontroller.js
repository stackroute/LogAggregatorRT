angular.module('tattva')
.controller('viewController',['$scope', '$http', '$stateParams','streamFactory', function($scope, $http, $stateParams,streamFactory){
  $scope.flag=true;
console.log("$stateParams.streamNameList =", $stateParams.streamNameList);
  streamFactory.sendStream($stateParams.streamNameList).then(function(response){
  $scope.editStream=response;
console.log("Data: ", response);
  });
  $scope.editFlag = function(){
    $scope.flag=false;
  };
}]);
