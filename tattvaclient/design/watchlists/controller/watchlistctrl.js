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
$scope.operator=['>','<']
$scope.showmesecound=true;
$scope.showmefirst=true;
$scope.namespaces = [{
  "name": "ngnix",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "apache",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "iot-sound",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}, {
  "name": "iot-temprature",
  "dataFields": [{"name": "request method", "field": "method", "type": "dimension"}]
}];
$scope.datastreams = [{
  "name": "ngnix-stream-GET",
  "namespace": "ngnix"
}, {
  "name": "ngnix-stream-POST",
  "namespace": "ngnix"
}, {
  "name": "apache-stream-GET",
  "namespace": "apache"
}, {
  "name": "apache-stream-POST",
  "namespace": "apache"
}];

//     removestatement:function(){
//     //  console.log($scope.wlstdef.statements);
//     var lastItem = $scope.wlstdef.statements.length-1;
//     console.log(lastItem);
//   //  $scope.statements.splice(lastItem);
// };

$scope.savewatchlist=function(){
}
addExpression=function(){

}



$scope.wlstdef = {
  expressions: [],
  addNewExpression:function() {
    var newExpr = {
      "tag": ("tag::" + (this.expressions.length + 1)),
      "joinWith": "",
      "joinBy": "",
      "inputStream" : "",
      "watch": {
        "lfield": {},
        "operator": {},
        "rfield": {}
      },
      "outputStream": {}
    };
    this.expressions.push(newExpr);
  },

  removeExpression:function() {
    var lastItem = $scope.wlstdef.expressions.length-1;
    this.expressions.splice(lastItem);
  }
};
$scope.savewatchlist=function()
{
  $http({
    method : 'post',
    url : '/savewatchlist',
    data : $scope.wlstdef
  }).success(function(data){
    if(data.errors){
      $scope.errorName = data.errors.name;
      $scope.errorUserName = data.errors.username;
      $scope.errorEmail = data.errors.email;
    }
    else{
      $scope.message=data.message;
    }
  });
$state.go("user");
}
}
]);
