angular.module('tattva')
.controller("orgDialogCtrl",['$scope','orgSite','adminFactory',function($scope, orgSite,adminFactory) {
    $scope.orgSite = orgSite;
    adminFactory.getOrgInfo(orgSite).then(function(res){
      console.log("orgInfo data:",res.data,"for",$scope.orgSite);
      $scope.orgInfo = res.data;
    },function(res){
      console.log("error",res.data.error);
    });
  }]);
