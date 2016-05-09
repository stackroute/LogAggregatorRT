var routerApp = angular.module('routerApp', ['ui.router', 'ngMaterial', 'ngLetterAvatar']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/subscription');

    $stateProvider
        .state('mainstream',{
            url:'/mainstream',
            templateUrl:'/partials/mainstream.html'
      })
        .state('mainstream.namespace', {
            url: '/namespace',
            templateUrl: '/partials/index1.html'
      })
        .state('mainstream.instance', {
            url: '/instance',
            templateUrl: '/partials/index5.html'
      })
				.state('mainstream.streams', {
					url: '/streams',
          templateUrl: '/partials/indexView.html',
          controller: 'routerCtrl'
			})
				.state('mainstream.function', {
					url: '/function',
					templateUrl: '/partials/index3.html'
			})
				.state('mainstream.watchlist', {
					url: '/watchlist',
					templateUrl: '/partials/index4.html'
			})
				.state('mainstream.streams.viewStreams',{
					url:'/:name',
          templateUrl: '/partials/viewStreams.html',
          controller: 'VICtrl'
			})
        .state('mainstream.streams.viewdata',{
          url: '/:name',
          controller: 'viewCtrl',
          templateUrl: '/partials/viewdata.html'
      })
        .state('mainstream.streams.create',{
          url: '/create',
          templateUrl: '/partials/indexCreate.html',
          controller: 'createController'
      })

});

routerApp.directive('query',function(){
var directive={};
directive.restrict="E";
directive.templateUrl="/partials/query.html";
return directive;
});


routerApp.controller('routerCtrl',['$scope', '$http',function($scope, $http){
  $scope.loadData=function()
{
   //console.log($routeParams.series);
	 // var url = '/data/' + $routeParams.series;
	 $http.get('/viewStreams').then(function(response){ $scope.data = response.data;});
};
$scope.loadData();
}]);

routerApp.controller('VICtrl',['$scope', '$http' , '$stateParams',function($scope,$http,$stateParams){
    // console.log(typeof $stateParams.name);
       $scope.objectJson=JSON.parse($stateParams.name);
    // console.log(typeof $stateParams.name);
       $scope.params=$scope.objectJson.streams;
       $scope.avatar=$scope.objectJson.instance;
    // $scope.params=$scope.objectJson.streams;
    // console.log($scope.objectJson.streams);
    // alert($scope.params);
    // $scope.loadData=function(){
    // $http.get('/json/'+url).then(function(response){$scope.data = response.data});
    // };
    // $scope.loadData();
}]);

routerApp.controller('viewCtrl',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
    $scope.value=JSON.parse($stateParams.name);
    //console.log($scope.value);
}]);

routerApp.controller('createController', ['$scope', '$http','namespaceService', 'instanceService', function($scope, $http, namespaceService, instanceService){
  // $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
  //     'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
  //     'WY').split(' ').map(function(state) {
  //         return {abbrev: state};
  //       })

  // $scope.loadData=function(){
  // $http.get('/viewNamespace').then(function(response){$scope.data = response.data;});
  // };
  // $scope.loadData();
  // console.log(data);

  // $scope.namespace=["n1","n2","n3","n4","n5"];
  // $scope.instance=["i1","i2","i3","i4"]
  // $scope.field=["ip", "temperature", "humidity", "voltage"];
  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]
  namespaceService.getData().success(function(data){
  $scope.namespace_collection=data;
});
  instanceService.getData().success(function(data){
  $scope.instance_collection=data;
});

  $scope.save=function(){
  // console.log("Saved");

  var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , nameofstream : $scope.user_streamName , description : $scope.stringDescription , query : {field: $scope.user_fields , operator: $scope.user_operator , value: $scope.user_value}};
  console.log(streamData);
  $http({
      method : 'post',
      url : '/filewrite',
      data : streamData
    }).success(function(data){
  if(data.errors){
    $scope.errorName = data.errors.name;
    $scope.errorUserName = data.errors.username;
    $scope.errorEmail = data.errors.email;
    }
  else{
    $scope.message=data.message;
}
});
}
  $scope.cancel=function(){
  console.log("Cancelled");
}
}]);


routerApp.service('namespaceService',['$http',function($http){
this.getData=function(){
return $http.get('/viewNamespace');
}
}]);

routerApp.service('instanceService',['$http',function($http){
this.getData=function(){
return $http.get('/viewInstance')
}
}]);
