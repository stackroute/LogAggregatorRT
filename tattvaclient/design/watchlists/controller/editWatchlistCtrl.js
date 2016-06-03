angular.module("tattva")
.controller('editWatchlistCtrl', ['$scope','$http', '$rootScope','$mdDialog','$timeout', '$q', '$log',"$state",'loadExprData','saveToDB',
function( $scope,$http,$rootScope,$mdDialog,$timeout, $q, $log,$state,loadExprData,saveToDB) {
  $scope.wlstdef = {
    namespace:"",
    stream:"",
    expressions: [],
    publisher:[
    ]
 };

  $scope.removeExpression=function(index) {
    $scope.wlstdef.expressions.splice(index,1);
  }
  $scope.addNewExpression=function(index,expr) {
    var newExpr = {
      "tag": ("tag::" + ($scope.wlstdef.expressions.length + 1)),
      "joinWith":"",
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
    $scope.index = 0;
    loadExprData.getOutcomeOptions().then(function(response){
      $scope.getOutcomeOptions=response;
      console.log($scope.getOutcomeOptions);
    });
    if(isNaN(index)){
      $scope.index = $scope.wlstdef.expressions.length;
      console.log($scope.index);
      if($scope.index!=0)
      {
        console.log("This is the expressions",$scope.wlstdef.expressions[$scope.index-1]);
        $scope.wlstdef.expressions[$scope.index-1].joinWith="tag::"+($scope.index+1);
      }
    }
    else{
      var current=newExpr;
      current.joinWith=expr.joinWith;
      expr.joinWith=current.tag;
      console.log(expr.joinWith);
      console.log("currentttt",current);
      $scope.index = index+1;
    }
    $scope.wlstdef.expressions.splice($scope.index,0,newExpr);
  }
  $scope.savewatchlist=function()
  {
  saveToDB.savewatchlistdata($scope.wlstdef);
  $state.go("design.watchlist");
  }
  $scope.actionButton=function(){
  console.log("hi");
  }
  $scope.opnePublisherDialogWindow = function () {
    console.log("in save");
    $scope.publisherData = {"WatchListName": "My first watch list"};
    $scope.showUIPublisherDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "publisherCtrl",
        templateUrl: "/design/watchlists/template/publisherSetting.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "data": $scope.wlstdef}
      }).then(function(response) {
        console.log("RESOLVED with response: ", response, " publisher in parent: ", $scope.publisherData);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " publisher in parent: ", $scope.publisherData);
      }).finally(function() {
        console.log("finally gone..!");
      });
    };
    $scope.showUIPublisherDialog();
  }

  $scope.opneOutputStreamDialog = function (){
    console.log("to stream");
    $scope.showOutputToStreamDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "outputToStreams",
        templateUrl: "/design/watchlists/template/outputToStreams.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        // locals: { "data": $scope.wlstdef }
      })
    };
    $scope.showOutputToStreamDialog();
  }

  $scope.opneSaveToDBDialogWindow = function (){
    console.log("to stream");
    $scope.showOutputToStreamDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "saveToDB",
        templateUrl: "/design/watchlists/template/saveToDB.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        // locals: { "data": $scope.wlstdef }
      })
    };
    $scope.showOutputToStreamDialog();
  }
}]);
