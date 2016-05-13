var tattva = angular.module('tattva');

tattva.controller('routerCtrl',['$scope', '$http',function($scope, $http){
  $scope.loadData=function()
  {
    $http.get('/viewStreams').then(function(response) {$scope.data = response.data;} );
  };
  $scope.loadData();
}]);


tattva.controller('VICtrl',['$scope', '$http' , '$stateParams', 'streamFactory', 'namespaceService',
function($scope, $http, $stateParams, streamFactory, namespaceService){
  console.log("1=",$stateParams.namespaceobject);
  $scope.objectJson=$stateParams.namespaceobject;
  console.log("from controller= " , $scope.objectJson);
  $scope.streamResultData={};

  namespaceService.getData().success(function(data){
    //console.log("data1=",data);
    $scope.namespace_collection=data;
  });

  $scope.getStreamData=function(objectJson){
    $scope.streamResultData = streamFactory.sendStream(objectJson);
    console.log("streamResult= ",$scope.streamResultData);
  }
}]);



tattva.controller('viewCtrl',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $scope.streamDetails = JSON.parse($stateParams.streamobject);
}]);




tattva.controller('createController', ['$scope', '$http','namespaceService', 'instanceService', function($scope, $http, namespaceService, instanceService){

  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]
  namespaceService.getData().success(function(data){
    //console.log("data1=",data);
    $scope.namespace_collection=data;
  });
  instanceService.getData().success(function(data){
    //console.log("data2=",data);
    $scope.instance_collection=data;
  });

  $scope.save=function(){
    // console.log("Saved");

    var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , streamname : $scope.user_streamName , description : $scope.stringDescription , query : [{field: $scope.user_fields , operator: $scope.user_operator , value: $scope.user_value }] };
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
