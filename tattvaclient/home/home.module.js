angular.module('tattva')
    .config(["$mdThemingProvider", "$mdIconProvider",
        function($mdThemingProvider, $mdIconProvider) {
            $mdThemingProvider.definePalette('cyanTheme', {
                '500': '00BCD4',
                '50': 'E0F7FA',
                '100': 'B2EBF2',
                '200': '80DEEA',
                '300': '4DD0E1',
                '400': '26C6DA',
                '500': '00BCD4',
                '600': '00ACC1',
                '700': '0097A7',
                '800': '00838F',
                '900': '006064',
                'A100': '84FFFF',
                'A200': '18FFFF',
                'A400': '00E5FF',
                'A700': '00B8D4',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'] //hues which contrast should be 'dark' by default
            });

            $mdThemingProvider.definePalette('LightCyan', {
                '50': '#def7f5',
                '100': '#a0e9e2',
                '200': '#72dfd4',
                '300': '#38d1c3',
                '400': '#2cbfb1',
                '500': '#26a69a',
                '600': '#208d83',
                '700': '#1b746c',
                '800': '#155b55',
                '900': '#0f423e',
                'A100': '#def7f5',
                'A200': '#a0e9e2',
                'A400': '#2cbfb1',
                'A700': '#1b746c',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
            });

            /*$mdThemingProvider.theme('default')
  .primaryPalette('cyanTheme') //500
  .accentPalette('cyanTheme',{
  'default' : '100'
})*/ //600

            $mdThemingProvider.theme('default')
                .primaryPalette('LightCyan') //500
            .accentPalette('cyanTheme', {
                'default': '100'
            })

        }
    ]);

angular.module('tattva')
    .config(function($mdIconProvider) {
        $mdIconProvider.fontSet('md', 'font-awesome');
    });

// angular.module('tattva')
// .config(function($mdIconProvider){
//   $mdIconProvider.fontSet('md', 'material-icons');
// });

angular.module('tattva')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/tattva');

            $stateProvider
                .state('tattva', {
                    url: "/tattva",
                    views: {
                        "header": {
                            templateUrl: "/home/template/header.html",
                            controller: "HeaderCtrl"
                        },
                        "content": {
                            templateUrl: "/home/template/content.html"
                        },
                        "footer": {
                            templateUrl: "/home/template/footer.html"
                        }
                    } //end of views of state tattva
                });
        }
    ]);