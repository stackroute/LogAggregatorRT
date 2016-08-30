angular.module('tattva')
    .controller('listNamespaceCtrl', ['$scope', '$mdDialog', 'namespaceFactory', 'nameSpaceColln', '$filter',
        function($scope, $mdDialog, namespaceFactory, nameSpaceColln, $filter) {
            $scope.currentPage = 0;
            $scope.pageSize = 5;
            $scope.nameSpaceListdata = [];
            $scope.q = '';
            $scope.tabTitle = "Namespaces";
            $scope.stateChange = "design.createNamespace";

            $scope.nameSpaceListdata = nameSpaceColln;

            console.log("namespace list ", $scope.nameSpaceListdata);
            console.log($scope.nameSpaceListdata.length);


            $scope.showSearchBox = function() {
                if ($scope.showSearch) {
                    $scope.showSearch = false;
                } else {
                    $scope.showSearch = true;
                }
            }

            $scope.showNamespacePreview = function() {
                console.log("Show preview from here");

                $mdDialog.show({

                    templateUrl: "design/namespaces/template/createNamespacedialog.html",
                    controller: "createNamespaceCtrl"
                });
            }
            $scope.getData = function() {
                console.log($filter('filter')($scope.nameSpaceListdata, $scope.q));
                return $filter('filter')($scope.nameSpaceListdata, $scope.q)

            }

            $scope.numberOfPages = function() {
                return Math.ceil($scope.getData().length / $scope.pageSize);
            }
        }
    ])

.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});
