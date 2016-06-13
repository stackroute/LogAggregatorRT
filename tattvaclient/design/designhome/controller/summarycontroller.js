angular.module('tattva')
.controller('summaryController',['$scope','designhomeFactory',function($scope, designhomeFactory){
    designhomeFactory.getdata().then(function(response){
console.log(response);
$scope.summary=response;
});
}]);
