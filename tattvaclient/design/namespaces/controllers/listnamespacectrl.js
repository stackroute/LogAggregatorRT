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
        $scope.showSearchBox = function() {
            if ($scope.showSearch) {
                $scope.showSearch = false;
            } else {
                $scope.showSearch = true;
            }
        }

        $scope.showNamespacePreview = function(nsname) {
            namespaceFactory.getNamespaceDetails(nsname).then( function(data){
                $mdDialog.show({
                    templateUrl: "design/namespaces/template/createnamespacedialog.html",
                    controller: "dataschemaNamespaceCtrl",
                    locals:{
                        dataSchema:data.uploadJSONText
                    }
                });
            })
        }

        $scope.getData = function() {
            return $filter('filter')($scope.nameSpaceListdata, $scope.q);
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
