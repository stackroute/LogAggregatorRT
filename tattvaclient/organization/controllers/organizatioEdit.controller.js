angular.module('tattva')
.controller('orgEditCtrl', ['$scope', '$stateParams','userservice','$state',
function($scope,$stateParams,userservice,$state) {

  var name=$stateParams.userName;
  if($stateParams.userName){
    $scope.userDisableName= true;
  }else {
    $scope.userDisableName= false;
  }
  $scope.loadData = function() {
    userservice.getUserName().then(function(response){ $scope.user = response;
      for(var i in $scope.user) {
        if($scope.user[i].name===name) {
          $scope.user.name=$scope.user[i].name;
          $scope.user.email=$scope.user[i].email;
          $scope.user.password="welcome@123";
          $scope.user.cfpwd = "welcome@123"
          $scope.user.role = $scope.user[i].role;
        }
      }
      console.log($scope.user);
     });
  }
  $scope.loadData();

  $scope.saveUser=function(){
    if($stateParams.userName){

      $scope.userDisableName= $stateParams.userName;
      var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password,role : $scope.user.role };
      userservice.editUser(userData);
    } else {
      var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password ,role : $scope.user.role};
      userservice.saveUser(userData);
    }
    $state.go('organisation');
  }

  $scope.cancel = function() {
    $state.go('organisation');
  }
}

]);
