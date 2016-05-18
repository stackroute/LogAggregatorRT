angular.module('tattva')
.controller("AppRouteCtrl", [
  "$scope",
  "$state",
  "$mdSidenav",
  "$anchorScroll",
  "$location",
  function($scope, $state, $mdSidenav, $anchorScroll, $location) {
    $state.go('guest');

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.isMember=true;

    $scope.login = function() {
      $scope.isMember=false;
      $scope.signOut=true;
      $scope.login=false;
      $state.go('user');
    };

    $scope.signout = function(){
      $scope.isMember=true;
      $scope.signOut=false;
      $scope.login=true;
      $state.go('guest');
    }

    $scope.gotoSlide1 = function(){
      $location.hash('slide1');
      $anchorScroll();
    }
    $scope.gotoSlide2 = function(){
      $location.hash('slide2');
      $anchorScroll();
    }
    $scope.gotoSlide3 = function(){
      $location.hash('footer');
      $anchorScroll();
    }
    $scope.gotohead = function(){
      $location.hash('head');
      $anchorScroll();
    }
  }
]);
