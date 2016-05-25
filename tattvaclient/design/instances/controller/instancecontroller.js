angular.module('tattva')
.controller("instCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",
  function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){

  $scope.selectedIndex = 1;
  $scope.submitInstance=function()
  {
    $state.go('instance.submitInstance');

  }
  $scope.loadData=function(){
    $http.get('/submitInstance').then(function(response){
      $scope.data = response.data;
    });
  }
  $scope.loadData();

  $scope.status='';
  $scope.customFullscreen=$mdMedia('xs') || $mdMedia('sm');
  $scope.addInstance= function($event){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      targetEvent: $event,
      controller: DialogController,
         templateUrl: "design/instances/template/createInstanceDialog.html",
      clickOutsideToClose:false,
      fullscreen: useFullScreen,
      parent: angular.element(document.body)
     /* scope:{success:'false'}*/
   });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

    function DialogController($scope,$state, $mdDialog,$http){


       $http.get('/submitInstance').then(function(response){
         $scope.namespaceSelect = response.data;
    });

       $scope.success=false;
      /*console.log($scope.nspname);*/
      $scope.dInstance={
        namespace:"",
        name:"",
        ipAddress:"",
        port:"",
        description:"",
        location:""

      };

      $scope.createMsg="";
      $scope.instanceSubmit=function(){
        console.log("data in ctrl ", $scope.dInstance);

        $http({
          method:'POST',
          url:'/createdialogInstance',
          data: $scope.dInstance
        }).success(function(response) {
          var data = {};
          if (data.errors) {
            $scope.errorName = data.errors.name;
            $scope.errorUserName = data.errors.username;
            $scope.errorEmail = data.errors.email;
          } else {
            $scope.updatedInstance=response;
            $scope.success=true;
            $scope.createMsg="Created successfully..!";

          /*  $mdDialog.templateUrl="partials/status.html";*/
          //$state.go('design.instance.addInstance.created');
          /*$scope.hideDialogAfterSuccess=function(){
            $mdDialog.hide();
          }*/

           /* console.dir($state);
            console.dir($state.href);*/
            /*$mdDialog.hide();*/
       /*$mdDialog.show({
                skipHide: true,
                controllerAs: 'DialogController',
                clickOutsideToClose:true,
                fullscreen: useFullScreen,
                parent: angular.element(document.body),
                controller: function($scope,$mdDialog){
                  $scope.status="true";
                  $scope.hideDialogAfterSuccess=function(){
                    $state.go('design.instance');
                    $mdDialog.hide();

                  }

                  },
            templateUrl:"partials/status.html"
              });*/





            /*$mdDialog.hide();*/
            /*$state.go("design.instance");*/

            /*if($scope.nspname===null)
              $state.go("design.instance");
            else
            $state.go("design.instance.viewInstance({name: '"+$scope.nspname+"' })");*/
          }
        });
      }



      $scope.cancel=function(){
        //$state.go('design.instance');

        $mdDialog.cancel();

         /*if(($scope.nspname).length===0)
         { console.log("empty");
              $state.go('design.instance');
            }
            else
            {console.log(" not empty");
            $state.go("design.instance.viewInstance({name: '"+$scope.nspname+"' })");
          }
*/
      }

    }
  }



}]);
