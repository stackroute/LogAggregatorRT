var tattva = angular.module('tattva', ["ngMaterial","ui.router"]);

// tattva.config(function($mdThemingProvider) {
//   $mdThemingProvider.theme('red')
//     .primaryPalette('pink')
//     .accentPalette('orange');
// });

tattva.config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('guest',
  {
    url:"/guest/{series}",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: function($scope,$http) {
          $scope.header="TATTVA - Log Aggregator";
          // $http.get("/json/guestMenu.json").success(function(data){
          //   $scope.items=data;
          // });
          $scope.loadData = function(){
            // var url='/' + $stateParams.series ;
            // console.log($stateParams.series);
            $http.get('/fetchfile').then(function(response){ $scope.items = response.data; });
          }
          $scope.loadData();
        }
      },
      "content" : {
        templateUrl: "/partials/content.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      },
    }
  })
  .state('Login',
  {
    url: "Login",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: function($scope,$http) {
          $scope.header="Login / Sign UP"
          $http.get("/json/guestMenu.json").success(function(data){
            $scope.items=data;
          });
        }
      },
      "content@" : {
        templateUrl: "/partials/login.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
  .state('Home',
  {
    url: "/",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: function($scope,$http) {
          $scope.header="Login / Sign UP"
          $http.get("/json/guestMenu.json").success(function(data){
            $scope.items=data;
          });
        }
      },
      "content@" : {
        templateUrl: "/partials/content.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
}]);

tattva.controller('ctrl', function($scope, $state, $mdSidenav, $http) {

  $state.go('guest');

  $scope.openLeftMenu = function() {
     $mdSidenav('left').toggle();
   };

 // 		$http.get('/').then(function(response){
  //      $scope.data = response.data;
  //   });
	// }
	// $scope.loadData();
});

// tattva.service('dataService',function($http){
//   this.getData=function(){
//     return $http.get('/fetchfile');
//   }
// });
