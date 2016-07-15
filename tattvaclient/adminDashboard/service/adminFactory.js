angular.module('tattva').factory('adminFactory',['$http',function($http){
  var factory={

    appDetails : function(){
        return $http.get('/adminDashboard');
    },

    orgList : function(){
        return $http.get('/adminDashboard/appPortfolio');
    },

    getWatchlists : function(orgSite){
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
  };

  return factory;
}]);
