angular.module("tattva")
.controller("outputToStreams",["loadExprData","$scope","$mdDialog","data",'streamFactory', function(loadExprData,$scope,$mdDialog,data,streamFactory){
  $scope.publisherData = data;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.streams=[];
  streamFactory.sendStream(data.namespace).then(function(data)
  {
    console.log(data);
    for(i in data)
    {
      console.log(data[i])
      $scope.streams.push(data[i].streamname);
    }
  });

  $scope.updateBackPublisher = function(Data) {
    var publisherExp2={
      "publishType":"outputToStreams",
      "Stream":$scope.streamName
    }
    console.log(publisherExp2);
    $scope.publisherData.publisher.push(publisherExp2);
    $mdDialog.hide();
  }
}])
