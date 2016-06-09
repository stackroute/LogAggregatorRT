angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','namespaceFactory','getListOfNamespace',function($scope,namespaceFactory,getListOfNamespace){

  $scope.tabTitle ="Namespaces";
  $scope.stateChange="design.createNamespace"

  $scope.nameSpaceListdata = getListOfNamespace;

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }
}]);
