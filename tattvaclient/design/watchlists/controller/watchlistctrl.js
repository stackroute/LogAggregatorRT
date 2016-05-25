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

$scope.wlstdef = {
  expressions: [],
  addNewExpression:function(index) {
$scope.index = 0;
if(isNaN(index)){
console.log("reached");
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
      "outputStream": {}
    };
    console.log(index);
    this.expressions.splice($scope.index,0,newExpr);
  },

  removeExpression:function(index) {
    this.expressions.splice(index,1);
  }
};















<!---modify to save to mongo-->
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
$scope.wlstdefView={
  "expressions": [
    {
      "tag": "tag::1",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": "inputvalue",
          "watchlistdialogvalue": "213",
          "exprAsText": "Value: 213"
        },
        "rfield": {
          "fieldType": "inputvalue",
          "watchlistdialogvalue": "223",
          "exprAsText": "Value: 223"
        },
        "operator": "+"
      },
      "outputStream": {}
    }
  ],
  "name": "surya",
  "description": "demo",
  "stream": "Stream1",
  "namespace": "Namespace2",
  "output": "ui publisher"
}
}
]);
