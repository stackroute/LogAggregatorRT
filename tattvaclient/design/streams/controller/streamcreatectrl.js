angular.module('tattva')
.controller('streamCreateCtrl', ['$rootScope','$scope', '$http','namespaceFactory', 'LoadDataSources','streamsservice','$stateParams','streamFactory','$state', function($rootScope,$scope, $http, namespaceFactory, LoadDataSources,streamsservice, $stateParams,streamFactory,$state){

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
    $scope.editParameter = $stateParams.streamName;
    $scope.editStreamFlag = true;
    streamFactory.sendStreamdata($stateParams.streamName).then(function(response){
      $scope.editStream=response;
      $scope.user_namespace = $scope.editStream.namespace;
      $scope.user_instance = $scope.editStream.instance;
      $scope.streamsData.user_streamName = $scope.editStream.streamname;
      $scope.streamsData.stringDescription = $scope.editStream.description;
      $scope.streamsData.queryBuilder = $scope.editStream.query;
    },function(response){
      $scope.resError = response.data.error;
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

  if ($scope.user_namespace) {
    namespaceFactory.getNamespaceDetails($scope.user_namespace).then(function(response){
      $scope.namespaceFields = [];
      for (i in  response.dataSchema){
        $scope.namespaceFields.push(response.dataSchema[i].name)
      }
    });
  }

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

  $scope.delete = function(index){
    $scope.streamsData.queryBuilder.splice(index,1);
  }

  $scope.save=function(){
    if ($stateParams.streamName) {

      var streamData={namespace : $scope.user_namespace , instance : $scope.user_instance , streamname : $scope.streamsData.user_streamName, description : $scope.streamsData.stringDescription , query : $scope.streamsData.queryBuilder };
    streamsservice.saveEditedStream(streamData).then(function(success){
        console.log("edited",success.data);
        var arr = [];

        arr.push(success.data.editedBy);
        arr.push("updated the stream");
        arr.push(success.data.streamname);
        arr.push("on");
        arr.push(moment().startOf(success.data.editedOn).format('MMMM Do YYYY, h:mm:ss a'));

        $rootScope.socket1.emit('notification',arr);
      },function(error){

        $scope.resError = error.data.error;
      });
      $scope.editStreamFlag = true;
    }
    else {
      var streamData={namespace : $scope.user_namespace , instance : $scope.user_instance, streamname : $scope.streamsData.user_streamName, description : $scope.streamsData.stringDescription , query : $scope.streamsData.queryBuilder };
      // console.log("streamData = ",streamData);
      streamsservice.saveStream(streamData).then(function(successCB){
        //console.log("created",successCB.data);
        var arr = [];
        //console.log("chandan",$scope.nameSpace.editedOn);
        arr.push(successCB.data.createdBy);
        arr.push("created the stream");
        arr.push(successCB.data.streamname);
        arr.push("on");
        arr.push(moment().startOf(successCB.data.createdOn).format('MMMM Do YYYY, h:mm:ss a'));
        //console.log(arr);
        $rootScope.socket1.emit('notification',arr);
        // $scope.showAlert("Stream saved successfully");
        // var savedDialog = $mdDialog.confirm()
        //                         .title('Stream')
        //success---change the state
      },function(errorCB){
        //error
        // console.log(errorCB.data.error);
        $scope.resError = errorCB.data.error;
      });
      $scope.editStreamFlag = true;
    }
    $state.go("design.streams.viewStreams");
  }

  $scope.edit=function(){
    $scope.editStreamFlag = false;
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
