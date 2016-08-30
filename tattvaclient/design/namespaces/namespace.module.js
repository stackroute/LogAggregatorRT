    angular.module('tattva')
        .config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider) {
                $stateProvider
                    .state('design.namespace', {
                        url: "/namespaces",
                        templateUrl: "/design/namespaces/template/NamespaceList.html",
                        controller: "listNamespaceCtrl",
                        resolve: {
                            nameSpaceColln: function(namespaceFactory) {
                                return namespaceFactory.getNameSpace().then(function(response) {
                                    return response;
                                }, function(response) {
                                    console.log("error in getting namespace data: ", response);
                                });
                            }
                        }
                    }).state('design.createNamespace', {
                        url: "/namespace/new",
                        templateUrl: "/design/namespaces/template/createNamespace.html",
                        controller: "createNamespaceCtrl"
                    }).state('design.editNamespace', {
                        url: "/namespace/:editNamespaceData",
                        templateUrl: "/design/namespaces/template/createNamespace.html",
                        controller: "createNamespaceCtrl"
                    })
            }
        ]);
