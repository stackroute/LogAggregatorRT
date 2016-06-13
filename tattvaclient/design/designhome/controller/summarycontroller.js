angular.module('tattva')
.controller('summaryController',['$scope','designhomeFactory',function($scope, designhomeFactory){
  designhomeFactory.getdata().then(function(response){
    $scope.summary=response;
  });
}]);
