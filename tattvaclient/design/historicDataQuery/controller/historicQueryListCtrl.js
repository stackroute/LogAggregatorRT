angular.module('tattva')
.controller('historicQueryListCtrl',['$scope','historicQueryColln','$filter',function($scope,historicQueryColln,$filter){

  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.q = '';
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
  $scope.getData = function() {
    return $filter('filter')($scope.historicQueryListdata, $scope.q);
  }

  $scope.numberOfPages = function() {
    return Math.ceil($scope.getData().length / $scope.pageSize);
  }
}
])
.filter('startFrom', function() {
  return function(input, start) {
    start = +start;
    return input.slice(start);
  }
});
