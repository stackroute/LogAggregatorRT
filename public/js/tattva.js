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
    $scope.signOut=true;
 		$scope.login=false;
 		$state.go('user');
  };

  $scope.signout = function(){
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
    // $scope.show = function() {
    //   $scope.sublist=true;
    // };
    // $scope.hide = function() {
    //   $scope.sublist=false;
    // };
  });

  // $scope.loadData = function(){
  //   $http.get('/fetchfile').then(function(response){
  //     $scope.items=response.data;
  //   });
  // }
  // $scope.loadData();

});

         tattva.directive('dashboardlayout', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "/partials/dashboardlayout.html";

            directive.scope = {
               mydata: '=name',
               myresult: '=result',
							 myname2:'=name2',
							 mylog:'=data'
            }

         return directive;
         });

				 tattva.directive('graph', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "/partials/graph.html";
         return directive;
         });
				 tattva.directive('data', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "/partials/data.html";
         return directive;
         });
				 tattva.directive('flow', function() {
            var directive = {};
            directive.restrict = 'E';
            directive.templateUrl = "/partials/flow.html";
         return directive;
         });

				 tattva.directive('donutchart', function(){
      function link(scope, el, attr){

        var color = d3.scale.category10();
        var data = scope.myresult.value;
        var width = 230;
        var height =230;
        var min = Math.min(width, height);
        var svg = d3.select(el[0]).append('svg');
        var pie = d3.layout.pie().sort(null);
        var arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);

        svg.attr({width: width, height: height});
        var g = svg.append('g')
          // center the donut chart
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        // add the <path>s for each arc slice
        g.selectAll('path').data(pie(data))
          .enter().append('path')
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('fill', function(d, i){ return color(i) });
      }
      return {
        link: link,
        restrict: 'E'
      };
    });

                 tattva.controller('myController', ['$scope',function($scope) {

                $scope.itemcollection=[
{"wlname": "WatchlistONE",
  "wldef":{
    "CountryName": "India",
    "CountryCode": "IND"
  },
	"value":[8, 3, 7]
},
	{"wlname": "WatchlistSECNOD",
	  "wldef":{
    "CountryName": "Pakistan",
    "CountryCode": "PAK"
  },
	"value":[15, 30, 27]
},
{	"wlname": "WatchlistTHIRD",
	  "wldef":{
    "CountryName": "America",
    "CountryCode": "USA"
  },
	"value":[38, 13, 70]
},
	{"wlname": "WatchlistFOUR",
	  "wldef":{
    "CountryName": "Britan",
    "CountryCode": "UK"
  },
	"value":[58, 32, 17]
}
];

	$scope.logdata=[
{
"CountryName": "India",
"CountryCode": "IND"
},
{
"CountryName": "Pakistan",
"CountryCode": "PAK"
},
{
	"CountryName": "America",
	"CountryCode": "USA"
},
{
	"CountryName": "Britan",
	"CountryCode": "UK"
}
];

                 }]);
