angular.module('tattva')
.controller('historicQueryListCtrl',['$scope','historicQueryColln',function($scope,historicQueryColln){

  $scope.tabTitle ="Historic Queries";
  $scope.stateChange="design.historicQueryAdd"

  $scope.historicQueryListdata = historicQueryColln;

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }

}]);
