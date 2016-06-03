angular.module("tattva")
.service('saveToDB', ['$http',function($http){
this.savewatchlistdata=function(watchlistData){
$http({
method : 'post',
url : '/watchlist',
data : 'watchlistData'
})
};
}]);
