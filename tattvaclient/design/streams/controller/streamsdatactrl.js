angular.module('tattva')
.controller('streamsDataCtrl',['$scope', '$http', '$stateParams','streamFactory', function($scope, $http, $stateParams,streamFactory){
  $scope.flag=true;
// console.log("$stateParams.streamNameList =", $stateParams.streamNameList);
  streamFactory.sendStreamdata($stateParams.streamName).then(function(response){
  $scope.editStream=response[0];
console.log("Data: ", $scope.editStream);
  });
  $scope.editFlag = function(){
    $scope.flag=false;
  };
}]);
