angular.module('tattva')
.controller('summeryController',['$scope','$interval','designhomeFactory',function($scope, $interval, designhomeFactory){
  $scope.summery=designhomeFactory.getdata();
  $scope.summaryValue = {};

  $scope.summery.forEach(function(item){
    $scope.summaryValue[item.name] = item.value;
  });

  $interval(function(){
    $scope.summery.forEach(function(item){
      if(item.name == "users"){
        var value= Math.round(Math.random() * 10000);
        $scope.summaryValue[item.name] = value;
      }
      else if(item.name == "actvwatchlist"){
        var value= Math.round(Math.random() * 10);
        $scope.summaryValue[item.name] = value;
      }
      else{
        var value= Math.round(Math.random() * 100);
        $scope.summaryValue[item.name] = value;
      }
    });
  }, 2000);
}]);
