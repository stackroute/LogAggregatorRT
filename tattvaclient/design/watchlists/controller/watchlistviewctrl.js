angular.module('tattva')
.controller('watchlistviewctrl',['$scope', '$http' , '$stateParams','wlstDataService','namespaceFactory',
function($scope, $http, $stateParams, wlstDataService,namespaceFactory){
  $scope.objectJson=$stateParams.namespaceobject;
  console.log($stateParams.namespaceobject);

  $scope.watchlistalldata=[];

  $scope.getwatchlistdata=function(objectJson){
   console.log(objectJson);
    $scope.filternamespace=objectJson;
    loadExprData.getwatchlistdata().then(function(data){
      var z={};
      z=data;
      console.log(z);
      for (i in z)
      {
        if(z[i].name==$scope.filternamespace)
        {
          $scope.watchlistalldata.push(z[i]);
        console.log($scope.watchlistalldata);
        }
      }
    });
  }
}]);
