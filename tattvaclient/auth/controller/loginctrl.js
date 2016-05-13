angular.module('tattva')
.controller('LoginCtrl', ['$scope', '$http', '$state',
function($scope, $http, $state) {
  $scope.loadData = function() {
    var tabs = [
      { title: 'Login'},
      { title: 'Register'}
    ],
    selected = null,
    previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      $scope.user = {
        site:'',
        orgn:'',
        location:'',
        name:'',
        email:'',
        pwd:'',
        cfpwd:''
      }
    });
  }
}]);
