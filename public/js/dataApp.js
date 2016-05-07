  var dataApp = angular.module('dataApp', ['ui.router','ngMaterial','ngMessages','ngMdIcons','ui.ace','ngLetterAvatar','ngScrollbars']);

  dataApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    /* $urlRouterProvider.otherwise('/');*/
  $stateProvider
    .state('login_reg', {
      url:'/login_reg',
          templateUrl: '/partials/login_reg.html',
          controller: 'data_1_Ctrlr'
       
       
      })
    .state("design",{
        url:"/design",
        templateUrl:"partials/design.html"
      })
      // .state('design.stream', {
      //   url: "/stream",
      //   templateUrl: "partials/stream.html"
      // })
      // .state('design.function', {
      //   url: "/function",
      //   templateUrl: "partials/function.html"
      // })
      // .state('design.watchlist', {
      //   url: "/watchlist",
      //   templateUrl: "partials/watchlist.html"
      // })
      .state('design.namespace', {
        url: "/namespace",
        templateUrl: "partials/namespace.html"
      })
      .state('design.function', {
        url: "/function",
        templateUrl: "partials/functionlist.html",
        controller:"functionlistCtrl"
      })
       .state('inbox1', {
        url: '/functional',
        templateUrl: '/partials/FunctionEdit.html',
        controller: 'functionEditCtrl'

       })
      .state('design.addfunction', {
        url:"/addFunction",
        templateUrl:"partials/cfunctions.html"
      })
      .state('design.instance', {
        url: "/instance",
        templateUrl: "partials/instance.html"
      })
      .state('design.createInstance', {
        url: "/instance/createInstance",
        templateUrl: "partials/createInstance.html",
        controller:"instCtrl"
      })
      .state('design.listInstance', {
        url: "/instance/listInstance",
        templateUrl: "partials/listInstance.html"
        // controller:"createInstanceCtrl"
      })
      .state('design.createNamespace', {
          url: "/createNamespace",
          templateUrl: "partials/createNamespace.html"
        })
      .state('design.submitInstance', {
          url: "/submitInstance",
          templateUrl: "partials/listInstance.html",
          controller:"instCtrl"
        })
      .state('design.submitInstance.viewInstance', {
          url: "/:name",
          templateUrl:"partials/viewInstance.html",
          controller:"viewinstCtrl"
        })
      .state('design.submitInstance.viewInstance.addInstance',{
        url:"/addInstance",
       controller:"viewinstCtrl"
      }).state('design.submitInstance.viewInstance.createInstance',{
        url:"/createdialogInstance/:nspname",
        controller:"InstDialogctrl"
      })
  	
  }]);

  dataApp.controller('data_1_Ctrlr', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
      //Your controller code goes here
      $scope.loadData = function() {
        $http.get('/login_reg').then(function(response){
     
       var tabs = [
            { title: 'Login'},
            { title: 'Register'}

          ],
           selected = null,
          previous = null;
      $scope.tabs = tabs;
      $scope.selectedIndex = 0;
      $scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        $scope.user = {
          site:'',
         orgn:'',
         location:'',
        name:'',
        email:'',
        pwd:'',
        cfpwd:'' 
      }
    });

  })};  
      $scope.loadData();
      $scope.signUp=function(){
            $scope.selectedIndex=1;
          }
          $scope.signIn=function(){
            $scope.selectedIndex=0;
          }
    }

     
    
  ]);


  /*dataApp.directive('validPasswordC', function() {
    return {
      require: 'ngModel',
      scope: {

        reference: '=validPasswordC'

      },
      link: function(scope, elm, attrs, ctrl) {


        ctrl.$parsers.unshift(function(viewValue, $scope) {

          var noMatch = viewValue === scope.reference;
            console.log("nomatch1"+noMatch);
          console.log(viewValue);
          ctrl.$setValidity('noMatch',noMatch);
          console.log("nomatch"+noMatch);

          return (noMatch)?noMatch:undefined;
        });

         scope.$watch('reference', function(value) {
          console.log(ctrl.$viewValue+"--------"+value);

          console.log("________________", value === ctrl.$viewValue);
          ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

        });

        

       
      }
    }
  });*/

  dataApp.controller('functionCtrl', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
      //Your controller code goes here
      $scope.loadData = function() {
        $http.get('/function').then(function(response){
    $scope.items = ['Dimensions','Measures'];
    $scope.selected = [0];
    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.isIndeterminate = function() {
      return ($scope.selected.length !== 0 &&
          $scope.selected.length !== $scope.items.length);
    };

    $scope.isChecked = function() {
      return $scope.selected.length === $scope.items.length;
    };

    $scope.toggleAll = function() {
      if ($scope.selected.length === $scope.items.length) {
        $scope.selected = [];
      } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        $scope.selected = $scope.items.slice(0);
      }
    };
  });
      }
    }]);





  dataApp.controller("instCtrl",["$scope","$state","$http",function($scope,$state,$http,$mdDialog,$mdMedia){

   $scope.submitInstance=function()
  { 
    $state.go('design.submitInstance');

   }
    $scope.loadData=function(){
     $http.get('/submitInstance').then(function(response){$scope.data = response.data; console.log($scope.data)});
  }
  $scope.loadData();


  }]);


  dataApp.controller("viewinstCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){
  $scope.nspname=$stateParams.name;
  $scope.loadData = function() {
        $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
      }
      $scope.loadData();

    
      $scope.status='';
  $scope.customFullscreen=$mdMedia('xs') || $mdMedia('sm');
  $scope.addInstance= function($event){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
     $mdDialog.show({
       targetEvent: $event,
       controller: DialogController,
            templateUrl: "partials/createInstanceDialog.html",
            clickOutsideToClose:true,
        fullscreen: useFullScreen,
         parent: angular.element(document.body),
            scope: $scope

        
      }).then(function(answer) {
        $scope.status = 'You decided to get rid of your debt.';
      }, function() {
        $scope.status = 'You decided to keep your debt.';
      });
   


   $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });

  function DialogController($scope,$state, $mdDialog,$http){

    console.log($scope.nspname);
     $scope.dInstance={
      name:"",
      ipAddress:"",
      port:"",
      description:"",
      location:""

     };
      
    $scope.instanceSubmit=function(){

    var data={
      namespace:$scope.nspname,
      instance:$scope.dInstance
    };
    $http({
      method:'POST',
      url:'/createdialogInstance',
      data: data
    })
     .success(function(response) {
      
              if (data.errors) {
                $scope.errorName = data.errors.name;
                $scope.errorUserName = data.errors.username;
                $scope.errorEmail = data.errors.email;
              } else {
               
                $scope.data=response;
               /*$state.go("design.submitInstance.viewInstance({name: '"+$scope.nspname+"' })");*/
              } 
          


            });
         
    $mdDialog.hide();
          
  }

  }
  }

  }]);


  dataApp.controller("InstDialogctrl",["$scope","$state","$http","$stateParams",function($scope,$state,$http,$stateParams){
  $scope.fetchnspname=$stateParams.nspname;
  console.log("hello");
  /*$scope.loadData = function() {
        $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
      }
      $scope.loadData();*/
  }]);


/*functions*/


dataApp.controller('functionlistCtrl', ['$scope', '$http','$mdDialog',
function($scope, $http, $mdDialog) {

   $scope.loadData = function() {
$http.get('/func_link').then(function(response){ $scope.data = response.data; });
}
$scope.loadData();

    $scope.selectedUserIndex = undefined;
    $scope.selectUserIndex = function (index) {
      if ($scope.selectedUserIndex !== index) {
        $scope.selectedUserIndex = index;
      }
      else {
        $scope.selectedUserIndex = undefined;
      }
    };

    $scope.selectedUserIndex1 = undefined;
    $scope.selectUserIndex1 = function (index) {
      if ($scope.selectedUserIndex1 !== index) {
        $scope.selectedUserIndex1 = index;
      }
      else {
        $scope.selectedUserIndex1 = undefined;
      }
    };

    $scope.deleteMe = function(ev) {
     //  Appending dialog to document.body to cover sidenav in docs app
       var confirm = $mdDialog.confirm()
             .title('Delete')
             .textContent('Are you surely want to delete.')
             .ariaLabel('Lucky day')
             .targetEvent(ev)
             .ok('Yes')
             .cancel('Cancel');
       $mdDialog.show(confirm);
     };
}
]);
dataApp.controller('functionEditCtrl', ['$scope', '$http','$mdDialog',
function($scope, $http, $mdDialog) {

    $scope.loadData = function() {
$http.get('/func_link_data').then(function(response){ $scope.data = response.data; });
}
$scope.loadData();

    $scope.saveData=function(){
      var item={fun_name:$scope.data[0].fun_name,Descr:$scope.data[0].Descr,var:$scope.data[0].var,fun:$scope.data[0].fun};
      console.log(item);

      $http({
            method  : 'POST',
            url     : '/func_send_data',
            data    : item //forms user object
            // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
           })
            .success(function(data) {
              if (data.errors) {
                // Showing errors.
                $scope.errorName = data.errors.name;
                $scope.errorUserName = data.errors.username;
                $scope.errorEmail = data.errors.email;
              } else {
                $scope.message = data.message;
              }
            });
    };

  }
]);