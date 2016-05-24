angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','namespaceFactory',function($scope,namespaceFactory){

  $scope.tabTitle ="Namespaces";
  $scope.stateChange="design.createNamespace"

  namespaceFactory.getNameSpace().then(function(response){
    $scope.nameSpaceListdata = response;
  });

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }

  // $scope.search = function(){
  //   alert("clicked")
  // }

}]);
