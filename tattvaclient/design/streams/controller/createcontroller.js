angular.module('tattva')
.controller('createController', ['$scope', '$http','namespaceService', 'instanceService', function($scope, $http, namespaceService, instanceService){
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
    var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , streamname : $scope.user_streamName , description : $scope.stringDescription , query : $scope.streamsData.queryBuilder };
    $http({
      method : 'post',
      url : '/filewrite',
      data : $scope.streamData
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
}])
