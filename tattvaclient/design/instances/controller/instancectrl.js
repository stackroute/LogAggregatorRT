 angular.module('tattva')
    .controller("InstanceCtrl", ["$scope", "$state", "$http", "$stateParams", "$mdDialog", "$mdMedia","namespaceFactory",
        function($scope, $state, $http, $stateParams, $mdDialog, $mdMedia, namespaceFactory) {

            $scope.tabTitle = "Recent Data Sources";
            $scope.stateChange = "design.createwatchlist"

            $scope.selectedIndex = 1;
            $scope.submitInstance = function() {
                $state.go('instance.submitInstance');

            }

            namespaceFactory.getNameSpace().then(function(response){$scope.data=response;});


            // $scope.loadData = function() {
            //     $http.get('/instance').then(function(response) {
            //         $scope.data = response.data;
            //     });
            // }
            // $scope.loadData();

            $scope.status = '';
            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            $scope.addInstance = function($event) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                $mdDialog.show({
                    targetEvent: $event,
                    controller: DialogController,
                    templateUrl: "design/instances/template/createInstanceDialog.html",
                    clickOutsideToClose: false,
                    // fullscreen: useFullScreen,
                    parent: angular.element(document.body),
                        /* scope:{success:'false'}*/
                });



                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });

                function DialogController($scope, $state, $mdDialog, $http) {


                    namespaceFactory.getNameSpace().then(function(response){  $scope.namespaceSelect=response;});

                   $scope.formtype="CREATE";
                    $scope.success = false;
                    /*console.log($scope.nspname);*/
                    $scope.dInstance = {
                        namespace: "",
                        name: "",
                        ipAddress: "",
                        port: "",
                        description: "",
                        location: ""

                    };

                    $scope.createMsg = "";
                    $scope.instanceSubmit = function() {
                        console.log("data in ctrl ", $scope.dInstance);

                        $http({
                            method: 'POST',
                            url: 'instance/createdialogInstance',
                            data: $scope.dInstance
                        }).success(function(response) {
                            var data = {};
                            // if (data.errors) {
                            //     $scope.errorName = data.errors.name;
                            //     $scope.errorUserName = data.errors.username;
                            //     $scope.errorEmail = data.errors.email;
                            // } else {
                                $scope.updatedInstance = response.data;
                                  // $state.go("design.instance.viewInstance.addInstance.created");

                                    // if(Object.is($scope.updatedInstance,$scope.dInstance))
                                    // {
                                $scope.success = true;
                                $scope.createMsg = "Instance Saved Successfully...!";

                              // }

                                /*  $mdDialog.templateUrl="partials/status.html";*/
                                //$state.go('design.instance.addInstance.created');
                                /*$scope.hideDialogAfterSuccess=function(){
                                  $mdDialog.hide();
                                }*/

                                /* console.dir($state);


                                /*if($scope.nspname===null)
                                  $state.go("design.instance");
                                else*/
                                // $state.go("design.instance.viewInstance.addInstance({name: '"+$scope.dInstance.namespace+"' })");

                        });
                    }

                  $scope.ok=function(){
                    // if($scope.nspname===null)
                    //   // $state.go("design.instance");
                    // else
                    // $state.go("design.instance.viewInstance({name: '"+$scope.dInstance.namespace+"' })");
                      $mdDialog.cancel();


                  }

                    $scope.cancel = function() {
                      $mdDialog.cancel();

                      }
                      $scope.ok=function(){
                        $mdDialog.cancel();
                      }

                }
            }



        }
    ]);
