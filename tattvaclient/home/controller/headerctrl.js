angular.module('tattva')
.controller('HeaderCtrl',["$scope","$http",function($scope,$http){
  $scope.header="TATTVA - Complex Event Processor";
  $scope.loadData= function(){
    $http.get('/sideNav').then(function(response){
      $scope.items=response.data;
      console.log($scope.data);
    })
  };
  $scope.loadData();
}]);
 
