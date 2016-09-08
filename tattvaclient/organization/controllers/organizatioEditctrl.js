angular.module('tattva')
.controller('orgEditCtrl', ['$scope', '$stateParams','userservice','$state','AuthService',
function($scope,$stateParams,userservice,$state,AuthService) {
  $scope.org = AuthService.getCurrentUser();
  console.log($scope.org);
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
     });
  }
  $scope.loadData();

  $scope.saveUser=function(){
    if($stateParams.userName){

      $scope.userDisableName= $stateParams.userName;
      var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password,role : $scope.user.role ,orgsite : $scope.org.orgsite};
      userservice.editUser(userData);
    } else {
      var userData={name : $scope.user.name , email : $scope.user.email , password : $scope.user.password ,role : $scope.user.role ,orgsite : $scope.org.orgsite};
      console.log(userData);
      userservice.saveUser(userData);
    }
    $state.go('tattva.organisation');
  }

  $scope.cancel = function() {
    $state.go('tattva.organisation');
  }
}

]);
