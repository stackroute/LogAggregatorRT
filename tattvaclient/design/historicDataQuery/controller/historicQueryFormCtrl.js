angular.module('tattva')
    .controller('historicQueryFormCtrl', ['$rootScope', '$scope', '$stateParams', '$filter', 'historicQueryFactory', '$rootScope', '$mdDialog', '$timeout', '$q', '$log', 'loadExprData', '$http', '$mdpDatePicker', '$mdpTimePicker', '$state', function($rootScope, $scope, $stateParams, $filter, historicQueryFactory, $rootScope, $mdDialog, $timeout, $q, $log, loadExprData, $http, $mdpDatePicker, $mdpTimePicker, $state) {

        $scope.fndef = {};
        $scope.timeFieldOption = [];
        $scope.fndef.queryCriteria = [];
        $scope.fndef.outputFields = [];
        $scope.edit = false;
        $scope.view = false;
        
        if ($stateParams.editHistoricQueryData) {
            var historicQueryObject = $stateParams.editHistoricQueryData;
            if (!$stateParams.view) {
                $scope.edit = true;
            } else {
                $scope.view = true;
            }
            historicQueryFactory.getHistoricQueryDetails(historicQueryObject).then(function(data) {
                $scope.fndef = data;
                //setting Query time period
                $scope.fromDate = new Date(data.fromDateTime);
                $scope.toDate = new Date(data.toDateTime);
                $scope.toDate.setHours($scope.toDate.getHours() + parseInt($scope.toDate.getTimezoneOffset() / 60));
                $scope.toDate.setMinutes($scope.toDate.getMinutes() + $scope.toDate.getTimezoneOffset() / 11);
                $scope.fromDate.setHours($scope.fromDate.getHours() + parseInt($scope.fromDate.getTimezoneOffset() / 60));
                $scope.fromDate.setMinutes($scope.fromDate.getMinutes() + $scope.fromDate.getTimezoneOffset() / 11);
                $scope.toTime = $scope.toDate;
                $scope.fromTime = $scope.fromDate;

                $scope.fndef.outputFields = data.outputFields;
                $scope.fndef.queryCriteria = data.queryCriteria;
            });
        }

        $scope.removeExpression = function(index, expr) {
            $scope.fndef.queryCriteria.splice(index, 1);
        }

        $scope.addNewExpression = function() {
            queryobject = {
                "lhs": "",
                "operator": "",
                "rhs": "",
                "joinwith": "And"
            };
            $scope.fndef.queryCriteria.push(queryobject);
        }

        $scope.addOutputExpression = function() {
            outputobject = {};
            $scope.fndef.outputFields.push(outputobject);
        }

        $scope.removeOutputExpression = function(index, expr) {
            $scope.fndef.outputFields.splice(index, 1);
        }

        $scope.savehistoricfunction = function(ev) {
            setQueryTime();
            historicQueryFactory.saveHistoricQuery($scope.fndef).then(function(data) {
                    //console.log("created",data);
                    var arr = [];
                    //console.log("chandan",data.editedOn);
                    arr.push(data.createdBy);
                    arr.push("created the historic querry");
                    arr.push(data.name);
                    arr.push("on");
                    arr.push(moment().startOf(data.editedOn).format('MMMM Do YYYY, h:mm:ss a'));
                    //console.log(arr);
                    $rootScope.socket1.emit('notification', arr);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Historic Query saved successfully!')
                        .ariaLabel('Historic Query saved successfully!')
                        .ok('Ok')
                        .targetEvent(ev)
                    );
                    $state.go("design.historicQuery");
                },
                function(data) {
                    $scope.error = data.error;
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Invalid Data!')
                        .textContent(data.message)
                        .ariaLabel('Historic Query Creation unsuccessfully Terminated!')
                        .ok('Ok')
                        .targetEvent(ev)
                    );
                })
        }

        var setQueryTime = function() {
            $scope.fndef.fromDateTime = $filter('date')(moment($scope.fromDate).format('YYYY-MM-DD') + 'T' + moment($scope.fromTime).format('HH:mm:ss') + '.000Z', 'yyyy-MM-dd HH:mm:ss Z', '+0530');
            $scope.fndef.toDateTime = $filter('date')(moment($scope.toDate).format('YYYY-MM-DD') + 'T' + moment($scope.toTime).format('HH:mm:ss') + '.000Z', 'yyyy-MM-dd HH:mm:ss Z', '+0530');
        }

        $scope.cancelhistoricfunctionadd = function() {
            $state.go("design.historicQuery");
        }

        $scope.updateHistoricfunction = function(ev) {
            setQueryTime();
            historicQueryFactory.setHistoricQueryDetails($scope.fndef, $scope.fndef.name).then(function(data) {
                    //console.log("updated",data);
                    var arr = [];
                    //console.log("chandan",data.editedOn);
                    arr.push(data.editedBy);
                    arr.push("update the historic querry");
                    arr.push(data.name);
                    arr.push("on");
                    arr.push(moment().startOf(data.editedOn).format('MMMM Do YYYY, h:mm:ss a'));
                    //console.log(arr);
                    $rootScope.socket1.emit('notification', arr);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Historic Query updated successfully!')
                        .ariaLabel('Historic Query updated successfully!')
                        .ok('Ok')
                        .targetEvent(ev)
                    );
                    $state.go("design.historicQuery");
                },
                function(data) {
                    $scope.error = data.error;
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Historic Query updation Failed!')
                        .ariaLabel('Historic Query updation Failed!')
                        .textContent(data.message)
                        .ok('Ok')
                        .targetEvent(ev)
                    );
                })
        }

        $scope.toggleToEdit = function() {
            $scope.edit = true;
            $scope.view = false;
        }

        $scope.test = function(fndefObj) {
            setQueryTime();
            $scope.queryResult = "";
            $scope.loading = true;
            historicQueryFactory.testHistoricQuery(fndefObj).then(function(data) {
                $scope.queryResult = data;
            })
        }

        $scope.clearQueryResult = function(ev) {
            $scope.queryResult = undefined;
            $scope.loading = false;
        }

    }]);
