angular.module('tattva')
.controller("appPortfolioCtrl",['$scope','$http','$state','$mdDialog','adminFactory',
 function($scope, $http, $state,$mdDialog,adminFactory) {

  adminFactory.orgList().then(function(res){
    $scope.orgs=res.data;
      console.log('$scope.orgs',$scope.orgs);
  },function(res){
    console.log("error",res.data.error);
  })

  $scope.orgClick = function(ev,orgSite){
      $mdDialog.show({
        controller: "orgDialogCtrl",
        templateUrl:'adminDashboard/template/orgDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals:{orgSite:orgSite},
        escapeToClose:true,
        fullscreen: true
      });
    // .then(function(response) {
    //   $scope.status = 'You said the information was "' + response + '".';
    // }, function() {
    //   $scope.status = 'You cancelled the dialog.';
    // });
  };

}]);
