angular.module('tattva')

.controller('createController', ['$scope', '$http','namespaceFactory', 'loaddatasources','streamsservice', function($scope, $http, namespaceFactory, loaddatasources,streamsservice){

  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]

$scope.$watch('user_namespace',function(){
console.log($scope.user_namespace);
  if($scope.user_namespace){
    loaddatasources.getdatasources($scope.user_namespace.name).then(function(res){
      console.log("instance_collection ",res.data);
      $scope.instance_collection=res.data;
    });
  }
})
  namespaceFactory.getNameSpace().then(function(response){
    $scope.namespace_collection=response;
    console.log("namespace_collection", $scope.namespace_collection);

    if($scope.user_namespace==undefined) return;
    console.log($scope.user_namespace.name);
  });



  // if($scope.user_namespace){
  // loaddatasources.getdatasources($scope.user_namespace.name).success(function(data){
  //   console.log("instance_collection ",data);
  //   $scope.instance_collection=data;
  // });
  // }
  // instanceService.getData().success(function(data){
  //   $scope.instance_collection=data;
  // });

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
