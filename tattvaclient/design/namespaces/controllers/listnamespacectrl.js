angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','namespaceFactory',function($scope,namespaceFactory){

  namespaceFactory.getNameSpace().then(function(response){
    $scope.nameSpaceListdata = response;
  });
  // console.log('namespaceList',namespaceFactory.getNameSpace());
  // console.log('namespaceList',$scope.nameSpaceListdata);

}])
