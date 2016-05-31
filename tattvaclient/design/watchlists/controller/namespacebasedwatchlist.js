
angular.module("tattva")
.controller('namespacebasedwatchlist',['$scope','$http','$mdDialog','wlstDataService',function($scope,$http,$mdDialog,wlstDataService)
{
  $scope.tabTitle ="Watchlist";
  $scope.stateChange="design.createwatchlist"
  $scope.loadData=function()
    {
      wlstDataService.getData().then(function(response) {$scope.data = response.data;} );
    };
    $scope.loadData();
}]);
