angular.module('tattva').factory('adminFactory',['$http',function($http){
  var factory={
    
    appPortfolio : function(){
        return $http.get('/adminDashboard');
    },

    orgList : function(){
        return $http.get('/adminDashboard/appPortfolio');
    },

    getWatchlists : function(orgSite){
      // console.log("orgSite from factory:",orgSite);
      return $http.get('/adminDashboard/getWatchlists/'+orgSite);
    },

    getOrganisationInfo : function(orgSite){
      return $http.get('/adminDashboard/getOrganisationInfo/'+orgSite);
    },

    getorgContactInfo : function(orgSite){
      return $http.get('/adminDashboard/getorgContactInfo/'+orgSite);
    },

    getOrgActivity : function(orgSite){
      return $http.get('/adminDashboard/getOrgActivity/'+orgSite);
    }


    // getWatchlist : function(getThisWatch){
    //   $http.get('getThisWatch/:'+getThisWatch.orgSite+'/:'+getThisWatch.name).then(function(res){
    //     //sucess
    //   },function(res){
    //     console.log("Failed to get watchlist:"+getThisWatch.name+"of organisation:"+getThisWatch.orgSite+" error:",res.data.error);
    //   });
    // }
  };
  return factory;
}]);
