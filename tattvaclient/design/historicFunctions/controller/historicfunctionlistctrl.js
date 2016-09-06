angular.module('tattva')
.controller('historicfunctionlistCtrl',['$scope','historicfunctionsFactory','historicfunctionsColln',function($scope,historicfunctionsFactory,historicfunctionsColln){

  $scope.tabTitle ="Historic Queries";
  $scope.stateChange="design.historicfunctionadd"

  $scope.historicfunctionsListdata = historicfunctionsColln;

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }

}]);
