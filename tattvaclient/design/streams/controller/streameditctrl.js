angular.module('tattva')
.controller('streamEditCtrl', ['$scope', '$http','namespaceService', 'instanceService','$stateParams','streamFactory','namespaceFactory','loaddatasources',
function($scope, $http, namespaceService, instanceService, $stateParams, streamFactory, namespaceFactory, loaddatasources){
  console.log("$stateParams.streamNameList = " ,  $stateParams.streamNameList);
  streamFactory.sendStreamdata($stateParams.streamNameList).then(function(response){
  $scope.editStream=response;
  console.log("Data: ", $scope.editStream);
  });

  namespaceFactory.getNameSpace().then(function(response){
    $scope.namespace_collection=response;
    console.log("namespace_collection", $scope.namespace_collection);

    if($scope.user_namespace==undefined) return;
    console.log($scope.user_namespace.name);
  });

  $scope.$watch('user_namespace',function(){
  console.log($scope.user_namespace);
    if($scope.user_namespace){
      loaddatasources.getdatasources($scope.user_namespace.name).then(function(res){
        console.log("instance_collection ",res.data);
        $scope.instance_collection=res.data;
      });
    }
  })

  // $scope.streamsData={
  //   queryBuilder : [],
  //   and : function(){
  //     var newstmt={
  //       _id:(this.queryBuilder.length+1),
  //     }
  //     this.queryBuilder.push(newstmt);
  //   }
  // }

  $scope.delete = function(index){
    $scope.streamsData.queryBuilder.splice(index,1);
  }

  // $scope.nameOfStream = $scope.editStream.streamname;

  $scope.save=function(){
    var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , streamname : $scope.user_streamName , description : $scope.stringDescription , query : $scope.streamsData.queryBuilder };
    $http({
      method : 'post',
      url : '/editfilewrite',
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
}]);
