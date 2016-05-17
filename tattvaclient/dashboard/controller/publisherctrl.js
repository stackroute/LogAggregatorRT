angular.module('tattva')
.controller('publisherCtrl', ['$scope','$state','$http','$mdDialog',
function($scope,$state,$http,$mdDialog){

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.tabs = [{
    'name': 'Graph'
  },
  {
    'name': 'Summary'
  },
  {
    'name': 'Data'
  }];

  $scope.save=function(){
    var publisherData = {
      size : $scope.size,
      graphtype : $scope.graphtype,
      log : $scope.log
    };
  console.log(publisherData);
  $http({
      method:'post',
      url:'/publisherData',
      data:publisherData
    }).then(function(response){
      $scope.publisherData = response.data;
      console.log("Data");
    });
  }

  // $scope.save = function(){
  //   $scope.tabArray = [];
  //   angular.forEach($scope.tabs, function(tab){
  //     console.log(tab.selected);
  //     if ($scope.tab.selected)
  //     {
  //       $scope.tabArray.push(tab.name);
  //       console.log("helloo");
  //     }
  //   });
  //   console.log($scope.tabArray);
  // }
}]);
