angular.module('tattva')
.controller('orgEditCtrl', ['$scope', '$stateParams','userservice','$state',
function($scope,$stateParams,userservice,$state) {
  console.log("u r in edit organization");
  var name=$stateParams.userName;

  console.log("u want to know thw information is",name);

  $scope.loadData = function() {
    userservice.getUserName().then(function(response){ $scope.user = response;
      for(var i in $scope.user) {
        if($scope.user[i].name===name) {
          $scope.user.name=$scope.user[i].name;
          $scope.user.email=$scope.user[i].email;
          $scope.user.password="welcome@123";
          $scope.user.cfpwd = "welcome@123"
        }
      }
      console.log($scope.user);
     });
  }
  $scope.loadData();

  $scope.saveUser=function(){
    console.log("u r saving the user");
    var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password };
    console.log("the user is ",userData);
    userservice.saveUser(userData);
    $state.go('organisation');
  }

  $scope.cancel = function() {
    $state.go('organisation');
  }
}
]);
