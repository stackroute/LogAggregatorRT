angular.module('tattva')

.controller('streamCreateCtrl', ['$scope','$state', '$http','$mdDialog','namespaceFactory', 'LoadDataSources','streamsservice', function($scope,$state, $http,$mdDialog, namespaceFactory, LoadDataSources,streamsservice){

  $scope.operator=[">", ">=", "<", "<=", "==", "!=","Like","Not Like"];

  $scope.$watch('user_namespace',function(){
    console.log($scope.user_namespace);
    if($scope.user_namespace){
      LoadDataSources.getdatasources($scope.user_namespace.name).then(function(res){
        console.log("instance_collection ",res.data);
        $scope.instance_collection=res.data;
      });
    }
  });

  namespaceFactory.getNameSpace().then(function(response){
    $scope.namespace_collection=response;
    console.log("namespace_collection", $scope.namespace_collection);

    if($scope.user_namespace==undefined) return;
    console.log($scope.user_namespace.name);
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
    streamsservice.saveStream(streamData);
  }


  $scope.cancel=function(){
    console.log("Cancelled");
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
