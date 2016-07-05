angular.module('tattva')
.controller("appPortfolioCtrl",['$scope','$http','$state', function($scope, $http, $state) {

  // console.log("current seelection :" $scope.tattvaStats);
  

  var orgClick = function(ev,orgName){
    console.log("Calling the dialog box");
    $mdDialog.show({
      controller: "orgDialogController",
      templateUrl:'adminDashboard/template/orgDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      // clickOutsideToClose:true,
      // escapeToClose:true,
      // fullscreen: useFullScreen
    });
    // .then(function(response) {
    //   $scope.status = 'You said the information was "' + response + '".';
    // }, function() {
    //   $scope.status = 'You cancelled the dialog.';
    // });
  };

}]);
