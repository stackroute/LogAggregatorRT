angular.module('tattva')
    .controller("createNamespaceCtrl", ["$scope", "$state", "$http", "$mdDialog", "$mdToast", "namespaceFactory", "$stateParams",
        function($scope, $state, $http, $mdDialog, $mdToast, namespaceFactory, $stateParams) {

            $scope.temp = $scope.uploadJSONText;
            $scope.uploadJSONFlag = false;
            $scope.editData = undefined;

            $scope.nameSpace = {
                dataSchema: [{
                    type: "dimension"
                }]
            };

            $scope.editNamespaceFlag = true;
            if ($stateParams.editNamespaceData) {
                $scope.editData = $stateParams.editNamespaceData;
                console.log($scope.editData);
                namespaceFactory.getNamespaceDetails($scope.editData)
                    .then(function(res) {
                            $scope.nameSpace = res;
                        },
                        function(res) {
                            //error occourred
                            console.log("Error occoured while fetching details of namespace " + $scope.editData + "\n Error details: " + res);
                        }
                );
            };

            $scope.deleteDataFormat = function(index) {
                $scope.nameSpace.dataSchema.splice(index, 1);
            }

            $scope.addDataFormat = function() {
                var id = $scope.nameSpace.dataSchema.length;
                $scope.nameSpace.dataSchema.push({
                    type: "dimension"
                });
            }

            $scope.editNamespacetoggle = function() {
                $scope.editNamespaceFlag = false;
            };

            $scope.createNamespaceSubmit = function(ev) {
                if ($stateParams.editNamespaceData) { //edit namespace page - save button
                    var result = false;
                    if ($scope.createNameSpace.$dirty) { //if form elements are changed in edit page
                        if ($scope.createNameSpace.$valid) {
                            //confirming whether user wants to save changed data
                            var confirm = $mdDialog.confirm()
                                .title('Are you sure you want to change namespace ' + $scope.nameSpace.name + "?")
                                .ariaLabel('Namespace changed')
                                .targetEvent(ev)
                                .ok('Yes')
                                .cancel('No');
                            $mdDialog.show(confirm).then(function() {
                                namespaceFactory.setNamespaceDetails($scope.nameSpace, $scope.nameSpace.name)
                                    .then(function(res) {
                                            //success
                                            $scope.editNamespaceFlag = true;
                                            $scope.editData = undefined;
                                            $scope.showAlert(ev, "Namespace edited successfully!");
                                            $state.go("design.namespace");
                                        },
                                        function(res) {
                                            //error
                                            console.log("Error occoured while editing details of namespace " + $scope.nameSpace.name + "\n Error details: " + res);
                                        })
                            }, function() {
                                //user selected no
                                //do nothing
                                // $state.go("design.createNamespace")
                            });
                        } else {
                            //changes are not valid
                            //do nothing, form validations errors will be shown
                        }
                    } else {
                        //no changes made yet
                        //Confirming whether user wants to leave editing data and move to namespace list view
                        var confirm = $mdDialog.confirm()
                            .title('You made no changes in the form? Continue?')
                            .ariaLabel('Namespace not changed')
                            .targetEvent(ev)
                            .ok('Yes')
                            .cancel('No');
                        $mdDialog.show(confirm).then(function() {
                            //user selected yes
                            $state.go("design.namespace")
                        }, function() {
                            //user selected no
                            //do nothing
                            // $state.go("design.createNamespace")
                        });
                    }
                } else { //create namespace page  - save function

                    var timestamp = Date.now()
                    $scope.nameSpace.createdOn = timestamp;
                    $scope.nameSpace.editedOn = timestamp;
                    $scope.nameSpace.editedBy = "userName";
                    $scope.nameSpace.createdBy = "userName";
                    $scope.nameSpace.organisation = "Wipro";
                    $scope.nameSpace.status = "active";

                    if (!$scope.nameSpace.dataSchema.length) {
                        $scope.nameSpace.dataSchema.push({
                            type: "dimension"
                        });
                    }

                    if ($scope.createNameSpace.$valid) {
                        namespaceFactory.saveNameSpace($scope.nameSpace)
                            .then(function(res) {
                                    //success
                                    $scope.showAlert(ev, "Namespace saved successfully!");
                                    $state.go("design.namespace");
                                },
                                function(res) {
                                    //error
                                    console.log("Error occoured while saving namespace " + $scope.nameSpace.name + "\n Error details: " + res);
                                })
                    } else {
                        //form changes are not valid
                        //do nothing, form validations will be shown
                    }
                }
            }

            $scope.showConfirm = function(ev) {
                $state.go("design.namespace")
            };

            $scope.showAlert = function(ev, dialougeText) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(dialougeText)
                    .ariaLabel('Namespace updated.')
                    .ok('Ok')
                    .targetEvent(ev)
                );
                $state.go("design.namespace")
            };

            $scope.createNamespaceCancel = function() {
                $state.go("design.namespace");
            }

            $scope.uploadJSON = function(inputJSONText) {
                // try {
                //
                //   var outputJSONText = null;
                //   outputJSONText = JSON.parse(inputJSONText);
                //
                // } catch (e) {
                //   if(outputJSONText == null){
                //
                //   }
                // }
                // if($scope.nameSpace.dataSchema){
                //   schema = $scope.nameSpace.dataSchema;
                //   console.log(schema);
                //     var data = [];
                //     for ( i in $scope.nameSpace.dataSchema){
                //       data.push({"name":$scope.nameSpace.dataSchema[i].name, "type": $scope.nameSpace.dataSchema[i].type} )
                //     }
                //     var data = JSON.stringify(data)
                //     $scope.uploadJSONText = data;
                // }

                $scope.nameSpace.dataSchema = parseSampleToJSON(inputJSONText)
                $scope.uploadJSONFlag = false;
            }

            $scope.uploadJSONFlagToggle = function() {
                if ($scope.uploadJSONFlag)
                    $scope.uploadJSONFlag = false;
                else
                    $scope.uploadJSONFlag = true;
            }

            function parseSampleToJSON(sampleLogData) {
                // console.log("inputJSONObj = ",JSON.stringify(inputJSONObj));
                /*if (sampleLogData[0]) {
                    var dataObj = sampleLogData[0];
                } else {
                    var dataObj = sampleLogData;
                }*/

                var dataObj = parseToGetObject(sampleLogData);

                var outputData = [];
                var type;
                for (var i in dataObj) {
                    if (isNaN(dataObj[i])) {
                        type = "dimension"
                    } else {
                        type = "measure"
                    }
                    outputData.push({
                        "alias": i,
                        "name": i,
                        "type": type
                    });
                }
                console.log("outputData= ", outputData);
                return outputData;
            }

            function parseToGetObject(data) {
                if ((typeof data) === 'string') {
                    // console.log('***** Data is string');
                    data = JSON.parse(data);
                }

                if (Array.isArray(data)) {
                    // console.log('***** Data is ARRAY');
                    for (i = 0; i < data.length; i++) {
                        if ((typeof data[i]) === 'object') {
                            // console.log('***** Returning object');
                            return data[i];
                        }
                    }
                }
            }
        }
    ]);