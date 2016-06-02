angular.module("tattva")
.service('saveToDB', ['$http',function($http){
this.savewatchlistdata=function(watchlistData1){
var watchlistData=watchlistData1;
console.log("hi");
$http({
method : 'post',
url : '/watchlist',
data : watchlistData
}).then(function(response)
      {
        if (response.data.errors) {
          // Showing errors.
          $scope.errorName = response.data.errors.name;
        } else {
          $scope.message = response.data.message;
        }
      });
};
}]);
