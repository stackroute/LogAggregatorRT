angular.module("tattva")
.controller("outputToStreams",["loadExprData","$scope","$mdDialog","data", function(loadExprData,$scope,$mdDialog,data){
$scope.publisherData = data;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.streams=[];
  loadExprData.getStreamname().then(function(data)
  {
    for(i in data)
    {
      $scope.streams.push(data[i]);
    }
    console.log($scope.streams);
  });

  $scope.updateBackPublisher=function () {
    $scope.name="outputToStreams";
    var publisherData=[];
    var publisherExp={
      publishType:$scope.name,
      streamName:$scope.streamName
    }
    publisherData.push(publisherExp);
    $scope.publisherData.publisher=publisherData;
  $mdDialog.hide();
  }
}])
