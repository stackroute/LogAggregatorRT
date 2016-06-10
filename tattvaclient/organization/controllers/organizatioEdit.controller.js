angular.module('tattva')
.controller('orgEditCtrl', ['$scope', '$http','$mdDialog','$stateParams',
function($scope, $http, $mdDialog,$stateParams) {

  var name=$stateParams.userName;

  console.log("specified name is",name);

  $scope.loadData = function() {
    $http.get('/org_admin').then(function(response){ $scope.data = response.data;
      for(var i in $scope.data) {
        if($scope.data[i].name===name){
          $scope.user=$scope.data[i];
        }
      }
    });
  }
  $scope.loadData();
  // console.log("outside"+$scope.data);
  $scope.saveData=function(){
    var item={name:$scope.data[0].name,email:$scope.data[0].email,password:$scope.data[0].password};
    /*console.log(item);
    */
    $http({
      method  : 'POST',
      url     : '/orguser',
      data    : item
    })
    .success(function(data) {
      if (data.errors) {
        // Showing errors.
        $scope.errorName = data.errors.name;
        $scope.errorUserName = data.errors.username;
        $scope.errorEmail = data.errors.email;
      } else {
        $scope.message = data.message;
      }
    });
  };

}
]);
