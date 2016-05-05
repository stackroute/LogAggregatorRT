var tattva = angular.module('tattva', ["ngMaterial","ui.router","ngMdIcons"]);

tattva.config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('guest',
  {
    url:"/tattva",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content" : {
        templateUrl: "/partials/content.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      },
    }
  })
  .state('login',
  {
    url: "/login",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/login.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
	.state('user',
  {
    url: "/dashboard",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/dashboard.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
	.state('design',
  {
    url: "/design",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/design.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
}]);

tattva.controller('ctrl', function($scope, $state, $mdSidenav, $anchorScroll, $location) {

  $state.go('guest');

  $scope.openLeftMenu = function() {
     $mdSidenav('left').toggle();
   };

  //  $scope.hideSignIn=function(){
  //    $scope.login=false;
  //  }

   $scope.login = function() {
      $scope.isMember=true;
 		 $scope.login=false;
 		 $state.go('user');
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
		$location.hash('slide3');
		$anchorScroll();
	}
	$scope.gotoFooter = function(){
		$location.hash('footer');
		$anchorScroll();
	}
});

tattva.controller('headerCtrl',function($scope,$http){
  $scope.header="TATTVA - CEP";
  $http.get("/json/guestMenu.json").success(function(data){
    $scope.items=data;
  });

  // $scope.loadData = function(){
  //   $http.get('/fetchfile').then(function(response){
  //     $scope.items=response.data;
  //   });
  // }
  // $scope.loadData();

});
