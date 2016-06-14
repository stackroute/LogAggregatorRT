angular.module("tattva").factory('authinterceptor', ['$q', '$rootScope',
    function($q, $rootScope) {
        return {
            /*'request': function(config) {
                console.log("request interceptor on success");
                return config;
            },

            'requestError': function(rejection) {
                console.log("request error interceptor on error ");
                return $q.reject(rejection);
            },

            'response': function(response) {
                console.log("response interceptor on success");
                return response;
            },*/

            'responseError': function(rejection) {
                // console.log("response error ", rejection.status);

                if (rejection.status === 401) {
                    // console.log('Error due to authentication, requires signin again');
                    $rootScope.$emit("member-unauthorized");
                }

                return $q.reject(rejection);
            }
        };
    }
]).config(['$httpProvider',
    function($httpProvider) {
        //Registering a http interceptor to handle any HTTP res, res errors
        $httpProvider.interceptors.push('authinterceptor');
    }
]);
