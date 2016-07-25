
angular.module("tattva")
.controller('namespacebasedwatchlist',['$scope','$http','$mdDialog','wlstDataService','loadExprData',function($scope,$http,$mdDialog,wlstDataService,loadExprData)
{
  $scope.data=[];
  $scope.tabTitle ="Watchlist";
  $scope.stateChange="design.createwatchlist";

  $scope.selectedRow = 0;  // initialize our variable to null
  $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
    $scope.selectedRow = index;
  }

  // console.log("trying to load default namespace instances");
  // if($scope.data) {
  //   console.log("trying to load instances of ", $scope.data[0].name);
  //   $state.go("design.instance.viewInstance",{name:$scope.data[0].name});
  // }

  $scope.predicate = 'name';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.loadData=function()
  {
    loadExprData.getNameSpacenames().then(function(result)
    {
      for(i in result)
      {
        $scope.data.push(result[i]);
      }
    });
  };
}]);
