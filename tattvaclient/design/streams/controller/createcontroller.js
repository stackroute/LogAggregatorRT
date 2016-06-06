angular.module('tattva')
.controller('createController', ['$scope', '$http','namespaceFactory', 'instanceService','streamsservice', function($scope, $http, namespaceFactory, instanceService,streamsservice){
  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]

  // namespaceService.getData().success(function(data){
  //   $scope.namespace_collection=data;
  // });

  namespaceFactory.getNameSpace().then(function(response){
    $scope.namespace_collection=response;
    console.log("namespace_collection", $scope.namespace_collection);
  });

  instanceService.getData().success(function(data){
    $scope.instance_collection=data;
  });

  $scope.streamsData={
    queryBuilder : [],
    and : function(){
      var newstmt={
        _id:(this.queryBuilder.length+1),
      }
      this.queryBuilder.push(newstmt);
    }
  }

  $scope.delete = function(index){
    $scope.streamsData.queryBuilder.splice(index,1);
  }

  $scope.save=function(){
    var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , streamname : $scope.streamsData.user_streamName, description : $scope.streamsData.stringDescription , query : $scope.streamsData.queryBuilder };
    console.log(streamData);
    streamsservice.saveStream(streamData);
  }

  $scope.cancel=function(){
    console.log("Cancelled");
  }
}])
