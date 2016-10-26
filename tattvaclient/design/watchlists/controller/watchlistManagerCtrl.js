angular.module("tattva")
    .controller("watchlistManagerCtrl", ["$rootScope", "$scope", "$mdDialog",
        "data", 'edit', 'saveToDB', "$state",
        function($rootScope, $scope, $mdDialog, data, edit, saveToDB, $state) {
            $scope.cancel = function() {
                data.status = "inactive";
                if (edit) {
                    saveToDB.editwatchlistdata(data)
                        .then(
                            function(res) {
                                var arr = [];
                                arr.push(res.editedBy);
                                arr.push("update the watchlist");
                                arr.push(res.name);
                                arr.push("on");
                                arr.push(moment().startOf(res.editedOn).format(
                                    'MMMM Do YYYY, h:mm:ss a'));
                                //console.log(arr);
                                // $rootScope.socket1.emit('notification', arr);
                                //console.log("ctrl success");
                                $state.go('design.watchlist');
                                $mdDialog.cancel();
                            },
                            function(res) {}
                        );
                } else {
                    saveToDB.savewatchlistdata(data)
                        .then(
                            function(res) {
                                var arr = [];
                                arr.push(res.createdBy);
                                arr.push("created the watchlist");
                                arr.push(res.name);
                                arr.push("on");
                                arr.push(moment().startOf(res.createdOn).format(
                                    'MMMM Do YYYY, h:mm:ss a'));
                                //console.log(arr);
                                // $rootScope.socket1.emit('notification', arr);
                                //console.log("ctrl success");
                                $state.go('design.watchlist');
                                $mdDialog.cancel();
                            },
                            function(res) {

                            }
                        );
                }

            };
            $scope.watchlistName = data.name;

            $scope.updateBackPublisher = function() {
                data.status = "active";
                if (edit) {
                    saveToDB.editwatchlistdata(data)
                        .then(
                            function(res) {
                                var arr = [];
                                arr.push(res.editedBy);
                                arr.push("update the watchlist");
                                arr.push(res.name);
                                arr.push("on");
                                arr.push(moment().startOf(res.editedOn).format(
                                    'MMMM Do YYYY, h:mm:ss a'));
                                //console.log(arr);
                                // $rootScope.socket1.emit('notification', arr);
                                console.log("ctrl success");
                                saveToDB.savewatchloopdata(data);
                                $state.go('tattva.home');
                                $mdDialog.hide();
                            },
                            function(res) {}
                        );
                } else {
                    saveToDB.savewatchlistdata(data)
                        .then(
                            function(res) {
                                var arr = [];
                                arr.push(res.createdBy);
                                arr.push("created the watchlist");
                                arr.push(res.name);
                                arr.push("on");
                                arr.push(moment().startOf(res.createdOn).format(
                                    'MMMM Do YYYY, h:mm:ss a'));
                                //console.log(arr);
                                // $rootScope.socket1.emit('notification', arr);
                                console.log("ctrl success");
                                saveToDB.savewatchloopdata(data);
                                $state.go('tattva.home');
                                $mdDialog.hide();
                            },
                            function(res) {

                            }
                        );
                }

            }

            $scope.hide = function() {
                $mdDialog.hide();
            };

        }
    ])
