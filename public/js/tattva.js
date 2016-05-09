var myApp = angular.module("myApp",['ngMaterial','ui.router','ngLetterAvatar']);
myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state("design",{
    url:"/design",
    templateUrl:"partials/design.html"
  })

  .state('design.namespace', {
    url: "/namespace",
    templateUrl: "partials/namespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.listNameSpace', {
    url: "/namespace/listNameSpace",
    templateUrl: "partials/listNamespace.html",
    controller:"createNamespaceCtrl"
  })
  .state('design.createNamespace', {
    url: "/createNamespace",
    templateUrl: "partials/createNamespace.html",
    controller:"createNamespaceCtrl"

  })

  .state('design.instance', {
    url: "/instance",
    templateUrl: "partials/instance.html"
  })

  .state('design.stream', {
    url: "/stream",
    templateUrl: "partials/stream.html"
  })
  .state('design.function', {
    url: "/function",
    templateUrl: "partials/function.html"
  })
  .state('design.watchlist', {
    url: "/watchlist",
    templateUrl: "partials/watchlist.html"
  })

}]);
myApp.controller("myController",["$scope","$location","$log",function($scope,$location,$log){

}]);

myApp.controller("createInstanceCtrl",["$scope","$state",function($scope, $state){

  $scope.instance = {};

  $scope.submit = function (){
    // alert($scope.instance.name+"  "+ $scope.instance.ipAddress+"  "+ $scope.instance.description+"  "+$scope.instance.location);
    $state.go("design.listInstance");
  }

}]);

myApp.controller("createNamespaceCtrl",["$scope","$state","$http","$mdToast","$document",function($scope, $state, $http, $mdToast, $document){
  $scope.nameSpace = {
    dataSchema: []
  };
  var keyIndex=0;
  $scope.nameSpaceListdata=[];
  // /nameSpaceList
  var jsonNew=[];

  $scope.loadData=function()
  {
    // $http.get("/nameSpaceList").then(function(response){console.log(response.data) });
    $http.get("/nameSpaceList").then(function(response) {
      $scope.nameSpaceListdata = response.data;
      // console.log("my namespace list data: ", $scope.nameSpaceListdata);
      // alert("hi")
    });
  };
  // $scope.loadData();

  // console.log($scope.nameSpace.dataSchema.length);
  $scope.delete = function(index){
    console.log("index = "+ index+"    index type ="+typeof index);
    $scope.nameSpace.dataSchema.splice(index,1);
  }
  $scope.addDataFormat = function(){
    var newSchemaField = { 'fieldAlias': $scope.fieldAlias, 'fieldName': $scope.fieldName, 'fieldType': $scope.fieldType };
    // console.log("new field: ", newSchemaField);
    $scope.nameSpace.dataSchema.push(newSchemaField);
    // console.log($scope.nameSpace.dataSchema.length);
    // console.log($scope.nameSpace.dataSchema.length > 0);
    $scope.fieldAlias = $scope.fieldName = $scope.fieldType = "";
  }

  $scope.createNamespaceSubmit = function(){
    var toast = $mdToast.simple()
    .textContent('Namespace ' + $scope.name+' is created!')
    // .action('OK')
    .highlightAction(false)
    .hideDelay(3000)
    .position("bottom right");
    $mdToast.show(toast).then(function(response) {

      $state.go("design.listNameSpace");
    });

    $http({
      method  : 'POST',
      url     : '/createNamespacePost',
      data    : $scope.nameSpace.dataSchema
      // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      // if (data.errors) {
      //   $scope.errorName = data.errors.name;;
      // } else {
      //   $scope.message = data.message;
      // }
    });

  }
  // $scope.nameSpace.submit = function(){
  //   $scope.nameSpace.myJsonString = JSON.parse($scope.nameSpace.jsonFormat);
  // }

}]);
//
// // // var tattva = angular.module('tattva', ['ngMaterial', 'ngMdIcons']);
//
// var myApp = angular.module("myApp", ['ui.router']);
//
//
// myApp.config(function($stateProvider, $urlRouterProvider){
//   $stateProvider
//     .state('design', {
//           url:'/design',
//           templateUrl: 'partials/subscription.html',
//        })
//     .state('home',{
//       url:'home',
//       template:'<h1>The home state is displayed</h1>'
//     })
// });
//
//
// myApp.controller('AppCtrl', AppCtrl);
// function AppCtrl ( $scope ) {
//
// $scope.data = {
// selectedIndex: 0,
// secondLocked:  true,
// secondLabel:   "Item Two",
// bottom:        false
// };
// $scope.next = function() {
// $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
// };
// $scope.previous = function() {
// $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
// };
// }
