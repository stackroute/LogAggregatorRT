angular.module('tattva').controller("adminDashboardCtrl",['$scope','$http','$state','adminFactory',
function($scope, $http,$state,adminFactory){
  var currentInstance=null;
  $scope.stats=null;
  adminFactory.appDetails().then(function(res){
    $scope.sunburstData=res.data;
    // console.log($scope.sunburstData);
    $state.go('adminHome.appPortfolio');
  });
  var previousOrgSite;
  var selectionObj;
  $scope.tattvaStats={};

  stats = function(selectionObj){
    $scope.tattvaStats = selectionObj;
    console.log("selectionObj",selectionObj);

    if($scope.tattvaStats.instanceType == "super User"){
      $state.go('adminHome.appPortfolio');
    }
    else{
      prms = watchParams($scope.tattvaStats);
      console.log("changing state to orgwatches with params as ", prms);
      $state.go('adminHome.orgwatches', prms );
    }
  };

  var watchParams = function(statobj){
    // console.log("statobj",statobj);
    params = {};
    if(statobj.instanceType === "organization"){params = {orgSite:statobj.orgSite};}
    if(statobj.instanceType === "namespace"){params = {orgSite:statobj.orgsite,namespace:statobj.name};}
    if(statobj.instanceType === "datasource"){params = {orgSite:statobj.orgsite,namespace:statobj.namespace,datasource:statobj.name};}
    if(statobj.instanceType === "stream"){params = {orgSite:statobj.orgsite,namespace:statobj.namespace,datasource:statobj.instance,stream:statobj.streamname};}

    return params;
  }

}]);
