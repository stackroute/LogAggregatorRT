angular.module('tattva').controller('sunburstGraph',['$scope','$http',function($scope, $http){
  var currentInstance=null;
  $scope.stats=null;
    function getGraphdata() {
    $http.get('/test12.json').then(function(res){
      $scope.sunburstData = res.data;
    },function(res){
      console.log("Error in getting graph data from server, error: ", res.data);
    });
  }
  getGraphdata();
  stats = function(selectionObj){
    $scope.tattvaStats = selectionObj;
    // console.log("selection right outaa parent scope:",$scope.tattvaStats);
  };
}]);
