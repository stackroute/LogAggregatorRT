
angular.module("tattva")
.controller('namespacebasedwatchlist',['$scope','$http','$mdDialog','wlstDataService','loadExprData',function($scope,$http,$mdDialog,wlstDataService,loadExprData)
{
  $scope.data=[];
  $scope.tabTitle ="Watchlist";
  $scope.stateChange="design.createwatchlist"
  $scope.loadData=function()
  {
    loadExprData.getNameSpacenames().then(function(result)
    {
      console.log("namespace \n requested \n now");
      console.log(result);
      for(i in result)
      {
        $scope.data.push(result[i]);
      }
    });
  };
}]);
