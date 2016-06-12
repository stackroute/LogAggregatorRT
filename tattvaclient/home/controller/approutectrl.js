angular.module('tattva')
    .controller("AppRouteCtrl", [
        "$scope",
        "$state",
        "AuthService",
        "$rootScope",
        function($scope, $state, AuthService, $rootScope) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                //Sates which don't need authentication
                //login, tattva, signout
                if (toState.name == 'signin' || toState.name == 'tattva' || toState.name == 'signout') {
                    return;
                }

                //If user is not authenticated, but trying to navigate to a state, force the user to login
                if (!AuthService.isMember()) {
                    event.preventDefault(); // stop current execution
                    $state.go('signin');
                    return;
                }

                // authenticated (previously) but not coming from a initial state
                /*if (AuthService.isMember()) {
                    if (fromState.name === "" && toState.name !== "home" || toState.name !== "signin") {
                        event.preventDefault(); // stop current execution
                        $state.go('home');
                    }
                    return;
                }*/
            });

            //When the app initially loads 
            /*if (!AuthService.isMember()) {
                $state.go('tattva');
            } else {
                $state.go('home');
            }*/

            $rootScope.$on('member-unauthorized', function() {
                AuthService.signout().then(function(res) {
                        $state.go("signin");
                    },
                    function(res) {
                        console.log('Error in signing out ', res)
                        $state.go("signin");
                    });
            });
        }
    ]);