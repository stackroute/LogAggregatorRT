angular.module('tattva')
.controller('constantlistCtrl', ['$scope','$mdDialog',"constantFactory","$state",
function($scope, $mdDialog,constantFactory,$state) {
  $scope.tabTitle ="constant List";
  $scope.stateChange="design.addconstant";
  $scope.newconstant={
    con_name:"",
    value:"",
    Descr:"",
  }
  $scope.data=[];
  $scope.loadData = function() {
    constantFactory.loadconstantlist().then(function(res){
      $scope.data = res;
      //console.log(res);
    });
  };

  $scope.savedata = function() {
  //console.log("Saving a new constant ", $scope.newconstant);
    constantFactory.savedata($scope.newconstant)
    .then(function(data) {
      //success
      $scope.showAlert(null,"constant saved successfully!");
      $state.go("design.constant");
    },
    function(data) {
      $scope.error=data.error;
    })
  };

  $scope.showConfirm = function() {
    $state.go("design.constant")
  };

  $scope.showAlert = function(ev, dialougeText) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title(dialougeText)
      .textContent('constant saved sucessfully!')
      .ok('Ok')
      .targetEvent()
    );
    $state.go("design.constant")
  };
}
]);
