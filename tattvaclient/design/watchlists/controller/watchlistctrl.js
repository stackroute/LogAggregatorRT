angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$http', '$rootScope','$mdDialog','$timeout', '$q', '$log',"$state", function( $scope,$http,$rootScope,$mdDialog,$timeout, $q, $log,$state) {
  $scope.UI_Publish = function(ev) {
    $mdDialog.show({
      targetEvent: ev,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      title: 'This is an alert title',
      textContent: 'You can specify some description text in here.',
      ariaLabel:'Alert Dialog Demo',
      ok:'Got it!'
    }
  );
};

$scope.wlstdef = {
  expressions: [],
  addNewExpression:function(index) {
    $scope.index = 0;
    if(isNaN(index)){
      $scope.index = this.expressions.length;
    }
    else{
      console.log("index= ", index);
      $scope.index = index+1;
    }
    var newExpr = {
      "tag": ("tag::" + (this.expressions.length + 1)),
      "joinWith": "",
      "joinBy": "",
      "inputStream" : "",
      "watch": {
        "lfield": {
          "fieldType":"",
        },
        "rfield": {
          "fieldType":"",
        }
      },
    };

    this.expressions.splice($scope.index,0,newExpr);
  },
  "publisher": {
              "publisherType":"",
              },
  removeExpression:function(index) {
    this.expressions.splice(index,1);
  }
};
<!---modify to save to mongo-->
$scope.savewatchlist=function()
{
  console.log("hi");

}
}
]);
