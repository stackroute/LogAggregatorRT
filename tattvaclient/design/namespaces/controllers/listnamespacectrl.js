angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','namespaceFactory','nameSpaceColln',function($scope,namespaceFactory,nameSpaceColln){

  $scope.tabTitle ="Namespaces";
  $scope.stateChange="design.createNamespace"

  $scope.nameSpaceListdata = nameSpaceColln;

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }
}]);
