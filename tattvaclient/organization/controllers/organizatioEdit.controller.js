angular.module('tattva')
.controller('orgEditCtrl', ['$scope', '$http','$mdDialog','$stateParams',
function($scope, $http, $mdDialog,$stateParams) {

  var name=$stateParams.userName;

  console.log("specified name is",name);

  // $scope.loadData = function() {
  //   $http.get('/showOrgUser').then(function(response){ $scope.data = response.data;
  //     for(var i in $scope.data) {
  //       if($scope.data[i].name===name){
  //         $scope.user=$scope.data[i];
  //       }
  //     }
  //   });
  // }
  // $scope.loadData();
  // console.log("outside"+$scope.data);
  // $scope.saveData=function(){
  //   var item={name:$scope.user.name,email:$scope.user.email,password:$scope.user.password};
  //   console.log("Added user is",item);
  //   $http({
  //     method  : 'POST',
  //     url     : '/orguser',
  //     data    : item
  //   })
  //   .success(function(data) {
  //     if (data.errors) {
  //       // Showing errors.
  //       $scope.errorName = data.errors.name;
  //       $scope.errorUserName = data.errors.username;
  //       $scope.errorEmail = data.errors.email;
  //     } else {
  //       $scope.message = data.message;
  //     }
  //   });
  // };

}
]);
