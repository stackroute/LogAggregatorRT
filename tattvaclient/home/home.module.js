angular.module('tattva')
.config(["$mdThemingProvider", function($mdThemingProvider) {
  $mdThemingProvider.definePalette('cyanTheme',{
    '500' : '00BCD4',
    '50'  : 'E0F7FA',
    '100' : 'B2EBF2',
    '200' : '80DEEA',
    '300' : '4DD0E1',
    '400' : '26C6DA',
    '500' : '00BCD4',
    '600' : '00ACC1',
    '700' : '0097A7',
    '800' : '00838F',
    '900' : '006064',
    'A100': '84FFFF',
    'A200': '18FFFF',
    'A400': '00E5FF',
    'A700': '00B8D4',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100','200', '300', '400', 'A100'] //hues which contrast should be 'dark' by default
  });

  $mdThemingProvider.theme('default')
  .primaryPalette('cyanTheme') //500
  .accentPalette('cyanTheme') //600
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
