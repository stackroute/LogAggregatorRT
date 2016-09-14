angular.module('tattva')
.controller('functionlistCtrl', ['$scope', '$http','$mdDialog',"functionFactory",
  function($scope, $http, $mdDialog,functionFactory) {
    $scope.tabTitle ="Function List";
    $scope.stateChange="design.addfunction"
//  $scope.stateChange="design.function";
$scope.loadData = function() {
  /*$http.get('/function').then(function(response){
    $scope.data = response.data;
  });*/
       var result= functionFactory.getFunction()
   .then(function(data) {
          //success
          $scope.data=data;
        },
        function(data) {
          $scope.error=data.error;
        });
}
$scope.loadData();
$scope.selectedUserIndex = undefined;
$scope.selectUserIndex = function (index) {
  if ($scope.selectedUserIndex !== index) {
    $scope.selectedUserIndex = index;
  }
  else {
    $scope.selectedUserIndex = undefined;
  }
};

$scope.selectedUserIndex1 = undefined;
$scope.selectUserIndex1 = function (index) {
  if ($scope.selectedUserIndex1 !== index) {
    $scope.selectedUserIndex1 = index;
  }
  else {
    $scope.selectedUserIndex1 = undefined;
  }
};

$scope.deleteMe = function(ev) {
    //  Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .title('Delete')
    .textContent('Are you surely want to delete.')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Yes')
    .cancel('Cancel');
    $mdDialog.show(confirm);
  };
}
])
//////////////////////////////////
.controller('functionEditCtrl', ['$scope', '$http','$mdDialog','$stateParams',
  function($scope, $http, $mdDialog,$stateParams) {

    var name=$stateParams.functionname;
    $scope.loadData = function() {
    // $http.get('/func_link_data').then(function(response){ $scope.data = response.data;
    //   for(var i in $scope.data) {
    //     if($scope.data[i].fun_name===name){
    //       $scope.function=$scope.data[i];
    //     }
    //   }
    // });
  }
  $scope.loadData();
  $scope.saveData=function(){
    var item={fun_name:$scope.data[0].fun_name,Descr:$scope.data[0].Descr,var:$scope.data[0].var,fun:$scope.data[0].fun};
    // $http({
    //   method  : 'POST',
    //   url     : '/func_send_data',
    //   data    : item //forms user object
    //   // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    // .success(function(data) {
    //   if (data.errors) {
    //     // Showing errors.
    //     $scope.errorName = data.errors.name;
    //     $scope.errorUserName = data.errors.username;
    //     $scope.errorEmail = data.errors.email;
    //   } else {
    //     $scope.message = data.message;
    //   }
    // });
  };


}
]);
