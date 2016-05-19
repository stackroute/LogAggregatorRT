angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','namespaceFactory',function($scope,namespaceFactory){

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

}])
