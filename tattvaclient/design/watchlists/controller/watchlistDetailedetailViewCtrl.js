angular.module('tattva')
.controller('watchlistsdetailviewCtrl',['$scope', '$http', '$stateParams','wlstDataService', function($scope, $http, $stateParams,wlstDataService){
  var watchlistobject=$stateParams.watchlistobject;
console.log(watchlistobject);
  wlstDataService.getData().success(function(data)
  {
    $scope.data=data;
    var z=$scope.data;
    console.log("detailview",$scope.data);
    for(i in z)
    {
      if(z[i].name==watchlistobject)
      {
        $scope.filtereddata=z[i];
        console.log($scope.filtereddata);
      }
    }
  });
}
]);
