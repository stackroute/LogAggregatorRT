angular.module('tattva')
.controller('streamCreateCtrl', ['$scope', '$http','namespaceFactory', 'LoadDataSources','streamsservice','$stateParams','streamFactory', function($scope, $http, namespaceFactory, LoadDataSources,streamsservice, $stateParams,streamFactory){

  $scope.streamsData={
    queryBuilder : [],
    and : function(){
      var newstmt={
        _id:(this.queryBuilder.length+1),
      }
      this.queryBuilder.push(newstmt);
    }
  }

  $scope.editStreamFlag = false;
  $scope.editStream = undefined;
  if($stateParams.streamName){
    $scope.editStreamFlag = true;
    streamFactory.sendStreamdata($stateParams.streamName).then(function(response){
      $scope.editStream=response[0];
      $scope.user_namespace = $scope.editStream.namespace;
      $scope.user_instance = $scope.editStream.instance;
      // console.log($scope.user_instance);
      $scope.streamsData.user_streamName = $scope.editStream.streamname;
      $scope.streamsData.stringDescription = $scope.editStream.description;
      $scope.streamsData.queryBuilder = $scope.editStream.query;
      // console.log("Data: ", $scope.editStream);
    });
  }
  $scope.operator=[">", ">=", "<", "<=", "==", "!=","Like","Not Like"];

  namespaceFactory.getNameSpace().then(function(response){
    $scope.namespace_collection=[];
    $scope.namespaceFields = [];
    for (i in  response){
      $scope.namespace_collection.push(response[i].name)
    }
    // console.log("namespace_collection from create stream", $scope.namespace_collection);

    if($scope.user_namespace==undefined) return;
    // console.log($scope.user_namespace.name);
  });
  namespaceFactory.getNamespaceDetails($scope.user_namespace).then(function(response){
    $scope.namespaceFields = [];
    for (i in  response.dataSchema){
      $scope.namespaceFields.push(response.dataSchema[i].name)
    }
  });

  $scope.$watch('user_namespace',function(){
    if ($scope.user_namespace) {
      namespaceFactory.getNamespaceDetails($scope.user_namespace).then(function(response){
        $scope.namespaceFields = [];
        for (i in  response.dataSchema){
          $scope.namespaceFields.push(response.dataSchema[i].name)
        }
      });
    }
    $scope.instance_collection=[];
    if($scope.user_namespace){
      LoadDataSources.getdatasources($scope.user_namespace).then(function(res){
        // console.log("instance_collection ",res.data);
        for (i in res.data ){
          // console.log(res.data[i]);
          $scope.instance_collection.push(res.data[i].name);
        }
      });
      // console.log($scope.instance_collection);
    }
  });


  // $scope.$watch('user_namespace',function(){
  //   console.log($scope.user_namespace);
  //   if($scope.user_namespace){
  //     LoadDataSources.getdatasources($scope.user_namespace.name).then(function(res){
  //       console.log("instance_collection ",res.data);
  //       $scope.instance_collection=res.data;
  //     });
  //   }
  // });
  //
  // namespaceFactory.getNameSpace().then(function(response){
  //   $scope.namespace_collection=response;
  //   console.log("namespace_collection", $scope.namespace_collection);
  //
  //   if($scope.user_namespace==undefined) return;
  //   console.log($scope.user_namespace.name);
  // });

  // if($scope.user_namespace){
  // LoadDataSources.getdatasources($scope.user_namespace.name).success(function(data){
  //   console.log("instance_collection ",data);
  //   $scope.instance_collection=data;
  // });
  // }
  // instanceService.getData().success(function(data){
  //   $scope.instance_collection=data;
  // });



  $scope.delete = function(index){
    $scope.streamsData.queryBuilder.splice(index,1);
  }

  $scope.save=function(){
    if ($stateParams.streamName) {
      var streamData={namespace : $scope.user_namespace , instance : $scope.user_instance , streamname : $scope.streamsData.user_streamName, description : $scope.streamsData.stringDescription , query : $scope.streamsData.queryBuilder };
      streamsservice.saveEditedStream(streamData);
      $scope.editStreamFlag = true;
    }
    else {
      var streamData={namespace : $scope.user_namespace , instance : $scope.user_instance, streamname : $scope.streamsData.user_streamName, description : $scope.streamsData.stringDescription , query : $scope.streamsData.queryBuilder };
      streamsservice.saveStream(streamData);
      $scope.editStreamFlag = true;
    }
  }

  $scope.edit=function(){
    $scope.editStreamFlag = false;
  }

  $scope.cancel=function(){
    // console.log("Cancelled");
  }
  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .title('Are you sure you want to cancel it')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Yes')
    .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $state.go("design.streams")
    }, function() {
      $state.go("design.create")
    });
  };

}])
