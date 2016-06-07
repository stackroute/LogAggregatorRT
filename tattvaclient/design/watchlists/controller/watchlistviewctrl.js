angular.module('tattva')
.controller('watchlistviewctrl',['$scope', '$http' , '$stateParams','wlstDataService','namespaceFactory','loadExprData',
function($scope, $http, $stateParams, wlstDataService,namespaceFactory,loadExprData){
  $scope.objectJson=$stateParams.namespaceobject;
  console.log($stateParams.namespaceobject);

  $scope.watchlistalldata=[];

  $scope.getwatchlistdata=function(objectJson){
     console.log(objectJson);
    $scope.filternamespace=objectJson;
    loadExprData.getwatchlistdata($scope.filternamespace).then(function(data)
    {
      for(i in data)
    {
      $scope.watchlistalldata.push(data[i]);
    }
      })
  }
}]);
