angular.module('tattva')
.controller("orgDialogCtrl",['$scope','$mdDialog','orgSite','adminFactory',function($scope,$mdDialog, orgSite,adminFactory) {
  $scope.orgSite = orgSite;
  adminFactory.getOrganisationInfo(orgSite).then(function(res){
    console.log("orgInfo data:",res.data,"for",$scope.orgSite);
    $scope.orgInfo = res.data;
  },function(res){
    console.log("error",res.data.error);
  });

  adminFactory.getorgContactInfo(orgSite).then(function(res){
    console.log("org contact info:",res.data,"for",$scope.orgSite);
    $scope.orgContactInfo = res.data;
  },function(res){
    console.log("error in getting organisation contact info",res.data.error);
  });

  adminFactory.getOrgActivity(orgSite).then(function(res){
    console.log("recent activity:",res.data);
    $scope.recentActivity = res.data;
  },function(res){
    console.log("error in getting recent activity for ",$scope.orgSite," error:",res.data.error);
  });

  $scope.cancel=function(){

    $mdDialog.cancel();
  };
}]);
