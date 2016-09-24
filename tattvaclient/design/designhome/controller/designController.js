angular.module('tattva')
    .controller('designController', ['$state', '$scope', '$rootScope', function($state, $scope, $rootScope) {
        function checkState(data) {
            if (data.sname == 'design.summary') {
                $scope.selectedIndex = 0;
            } else if (data.sname == 'design.namespace') {
                $scope.selectedIndex = 1;
            } else if (data.sname == 'design.instance') {
                $scope.selectedIndex = 2;
            } else if (data.sname == 'design.streams') {
                $scope.selectedIndex = 3;
            } else if (data.sname == 'design.historicQuery') {
                $scope.selectedIndex = 4;
            } else if (data.sname == 'design.function') {
                $scope.selectedIndex = 5;
            } else if (data.sname == 'design.constant') {
                $scope.selectedIndex = 6;
            } else if (data.sname == 'design.watchlist') {
                $scope.selectedIndex = 7;
            }
        }
        $rootScope.$on("index", function(event, data) {
            //console.log(data);
            checkState(data);
        });
        //console.log($state.current.name);

        checkState({ sname: $state.current.name })
    }]);
