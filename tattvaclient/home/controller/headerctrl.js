angular.module('tattva')
.controller('HeaderCtrl',["$scope","$http","sideNavItemsFactory",function($scope,$http, sideNavItemsFactory){
  $scope.header="TATTVA - Complex Event Processor";
    sideNavItemsFactory.getSideNavItems().then(function(response){
      $scope.items = response;
    });
}]);
