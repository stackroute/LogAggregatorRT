angular.module('tattva')
.controller('watchlistviewctrl',['$scope', '$http' , '$stateParams','wlstDataService',
function($scope, $http, $stateParams, wlstDataService){
  $scope.objectJson=$stateParams.namespaceobject;
  $scope.watchlistalldata=[];

  $scope.getwatchlistdata=function(objectJson){
    $scope.filternamespace=objectJson;
    wlstDataService.getData().success(function(data){
      var z={};z=data;
      // $scope.watchlistalldata=data;
      for (i in z)
      {
        if(z[i].namespace==objectJson)
        {
          $scope.watchlistalldata.push(z[i]);
        }
      }
    });
  }
}]);
