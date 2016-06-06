angular.module('tattva')
.controller("AppRouteCtrl", [
  "$scope",
  "$state",
  "$mdSidenav",
  "$anchorScroll",
  "$location",
  function($scope, $state, $mdSidenav, $anchorScroll, $location) {
    $state.go('tattva');

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.isMember=true;
    $scope.login=true;

    $scope.signin = function() {
      $scope.isMember=false;
      $scope.signOut=true;
      $scope.login=false;
      $state.go('home');
    };

    $scope.signout = function(){
      $scope.isMember=true;
      $scope.signOut=false;
      $scope.login=true;
      $state.go('tattva');
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
