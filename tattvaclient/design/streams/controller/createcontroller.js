angular.module('tattva')
.controller('createController', ['$scope', '$http','namespaceService', 'instanceService','streamfactory',function($scope, $http, namespaceService, instanceService,streamfactory){
  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]

  namespaceService.getData().success(function(data){
    $scope.namespace_collection=data;
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
    var streamData={namespace : $scope.user_namespace.name , instance : "toBEChanged" , streamname : $scope.user_streamName , description : $scope.stringDescription , query : $scope.streamsData.queryBuilder };
    streamfactory.saveStream(streamData);
  }

  $scope.cancel=function(){
    console.log("Cancelled");
  }
}])
