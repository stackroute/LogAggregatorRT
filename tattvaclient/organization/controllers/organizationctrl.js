angular.module('tattva')
.controller('orgCtrl', ['$scope', '$mdDialog', '$http', 'AuthService', 'userservice', '$filter', '$state', function($scope, $mdDialog, $http, AuthService, userservice, $filter, $state) {
  $scope.showsrch = true;
   // var data = userservice.getUserName(data);
   $scope.org = AuthService.getCurrentUser();
   $scope.currentPage = 0;
   $scope.pageSize = 5;
   $scope.user = [];
   $scope.q = '';
   $scope.searchedUser = [];
   
   $scope.loadData = function() {
    $scope.username = "";
    $scope.showinput = false;
      // $scope.showclr = false;
      userservice.getUserName().then(function(response) {
        $scope.user = response;
        $scope.getData = function() {
          return $filter('filter')($scope.user, $scope.q)
        }

        $scope.numberOfPages = function() {
          return Math.ceil($scope.getData().length / $scope.pageSize);
        }
      });
    }
    $scope.loadData();

    $scope.searchUser = function() {
      userservice.getUser($scope.username).then(function(response) {
        $scope.user = response;
        $scope.showinput = true;
        // $scope.username = "";

      })
    }

    $scope.showConfirm = function(index) {
      $mdDialog.show({
        templateUrl: 'organization/views/userDetailsDialog.html',
        locals: {
          user: $scope.user,
          index: index
        },
        controller: DialogController
      });

    function DialogController($scope,AuthService, $state,userservice,$mdDialog, user,index) {
      $scope.user=user;
      $scope.org = AuthService.getCurrentUser();

      $scope.editUser=function(){
        var userData={
          name : $scope.user[index].name ,
          email : $scope.user[index].email , 
          password : $scope.user.password,
          orgsite : $scope.org.orgsite,
          role : $scope.user[index].role
        };
          
        userservice.editUser(userData).then(function(response){
        });
        $state.go('tattva.organisation');
        $mdDialog.hide();
      }
      $scope.index=index;
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
    }
  }
  }]);
