angular.module('tattva').factory('adminFactory',['$http',function($http){
  var factory={
    appPortfolio : function(){
        $http.get('appPortfolio').then(function(res){
          //success
          console.log("recieved response:",res.data);
          return;
        },
        function(res){
          console.log("Failed to load app portfolio error:",res.data.error);
        });
      },

    orgList : function(){
        return $http.get('/adminDashboard/appPortfolio');
    },

    getWatchlists : function(orgSite){
      // console.log("orgSite from factory:",orgSite);
      return $http.get('/adminDashboard/getWatchlists/:'+orgSite);
    },

    getWatchlist : function(getThisWatch){
      $http.get('getThisWatch/:'+getThisWatch.orgSite+'/:'+getThisWatch.name).then(function(res){
        //sucess
      },function(res){
        console.log("Failed to get watchlist:"+getThisWatch.name+"of organisation:"+getThisWatch.orgSite+" error:",res.data.error);
      });
    }
  };
  return factory;
}]);
