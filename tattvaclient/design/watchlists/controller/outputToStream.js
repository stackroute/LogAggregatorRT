angular.module("tattva")
.controller("outputToStreams",["loadExprData","$scope","$mdDialog", function(loadExprData,$scope,$mdDialog){
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
  // $scope.streams=loadExprData.getStreamname();
  // console.log($scope.streams);
}])
