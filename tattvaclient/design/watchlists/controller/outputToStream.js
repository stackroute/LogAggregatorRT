angular.module("tattva")
.controller("outputToStreams",["loadExprData","$scope","$mdDialog","data","publisherData",'streamFactory', function(loadExprData,$scope,$mdDialog,data,publisherData,streamFactory){
  $scope.publisherData = data;
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.streams=[];
  streamFactory.sendStream(publisherData.namespace).then(function(res) {
    var data = res.data;
    for(i in data)
    {
      $scope.streams.push(data[i].streamname);
    }
  }, function(res){ console.log("Error in getting stream data: ", res.data.error); $scope.error = res.data.error; });

  $scope.updateBackPublisher = function(Data) {
    $mdDialog.hide($scope.publisherData);
  }
}])
