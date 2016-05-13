angular.module('tattva')
.config(["$mdThemingProvider", function($mdThemingProvider) {
  var cyan = $mdThemingProvider.extendPalette('cyan', {
    '500' : '00BCD4'
    // '500' : '00BCD4',
    // '50'  : 'E0F7FA',
    // '100' : 'B2EBF2',
    // '200' : '80DEEA',
    // '300' : '4DD0E1',
    // '400' : '26C6DA',
    // '500' : '00BCD4',
    // '600' : '00ACC1',
    // '700' : '0097A7',
    // '800' : '00838F',
    // '900' : '006064'
  });

  $mdThemingProvider.definePalette('primary', cyan);

  $mdThemingProvider.theme('default')
  .primaryPalette('primary')
  .accentPalette('light-blue')
  .warnPalette('green');
}]);

angular.module('tattva')
.config(['$stateProvider','$urlRouterProvider',
function($stateProvider) {
  $stateProvider
  .state('guest', {
    url:"/tattva",
    views: {
      "header" : {
        templateUrl: "/home/template/header.html",
        controller: "HeaderCtrl"
      },
      "content" : {
        templateUrl: "/home/template/content.html"
      },
      "footer" : {
        templateUrl: "/home/template/footer.html"
      }
    }//end of views of state guest
  });
}]);
