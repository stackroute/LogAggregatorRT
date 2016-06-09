angular.module('tattva')
.controller("AppRouteCtrl", [
  "$scope",
  "$state",
  "$mdSidenav",
  "$anchorScroll",
  "$location",
  "AuthService",
  "$rootScope",
  function($scope, $state, $mdSidenav, $anchorScroll, $location, AuthService,$rootScope) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      //Sates which don't need authentication
      //login, tattva, signout
      if(toState.name == 'signin'
      || toState.name == 'tattva'
      || toState.name == 'signout') {
        return;
      }

      //If user is not authenticated, but trying to navigate to a state, force the user to login
      if( ! AuthService.isMember()) {
        event.preventDefault(); // stop current execution
        $state.go('signin');
        return;
      }

      // authenticated (previously) but not coming from a initial state
      if(AuthService.isMember()) {
        if (fromState.name === "" && toState.name !== "home" || toState.name === "signin") {
          event.preventDefault(); // stop current execution
          $state.go('home');
        }
        return;
      }
    });

    if( ! AuthService.isMember()) {
      $state.go('tattva');
    } else {
      $state.go('home');
    }

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

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
