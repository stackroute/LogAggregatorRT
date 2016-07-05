angular.module('tattva').factory('adminFactory.js',['$http','$q',function($http,$q){
  var factory={
    appPortfolio : function(){
      // return $q(function(resolve,reject){
        $http.get('appPortfolio').then(function(res){
          // resolve(res.data);
          //success
        },
        function(res){
          console.log("Failed to load app portfolio error:",res.data.error);
          // reject(res.data);
        });
      }
    },

    orgList: function(){
      $http.get('orgList').then(function(res){
        //success
      },function(res){
        console.log("Failed to load organizations list err:",res.data.error);
      });
    },

    selectionWatchlists : function(stats){
      $http.get('selectionWatchlists/:'+ stats.orgSite);
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
