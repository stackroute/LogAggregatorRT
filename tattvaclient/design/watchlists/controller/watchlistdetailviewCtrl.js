
tattva.controller('watchlistsdetailviewCtrl',['$scope', '$http', '$stateParams','wlstDataService', function($scope, $http, $stateParams,wlstDataService){
var watchlistobject=$stateParams.watchlistobject;
wlstDataService.getData().success(function(data)
{
$scope.data=data;
});
var z={};
var z=$scope.data;
console.log(z[2].name);
for(i in z)
{
if(z[i].name==watchlistobject)
{
$scope.filtereddata=z[i];
console.log($scope.filtereddata);
}
}
}]);
