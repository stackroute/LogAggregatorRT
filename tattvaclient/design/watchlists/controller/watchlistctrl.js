angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$mdDialog', '$log',"$state",'loadExprData','saveToDB',
function( $scope,$mdDialog, $log,$state,loadExprData,saveToDB) {

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
console.log($scope.wlstdef.publisher);
}
    // var flag,flagn,flaga;
    // if($scope.saveToDB) {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]==="saveToDB")
    //     {
    //       flag=1;
    //     }
    //   }
    //   if(flag!=1) {
    //     $scope.wlstdef.publisher.push("saveToDB");
    //   }
    // }
    // else {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]=="saveToDB")
    //     {
    //       $scope.wlstdef.publisher.splice(i, 1);
    //     }
    //   }
    // }
    //
    // if($scope.outputStream) {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]==="outputStream")
    //     {
    //       flagn=1;
    //     }
    //   }
    //   if(flagn!=1) {
    //     $scope.wlstdef.publisher.push("outputStream");
    //   }
    // }
    // else {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]=="outputStream")
    //     {
    //       $scope.wlstdef.publisher.splice(i, 1);
    //     }
    //   }
    // }
    //
    // if($scope.publishToDashboard) {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]==="publishToDashboard")
    //     {
    //       flaga=1;
    //     }
    //   }
    //   if(flaga!=1) {
    //     $scope.wlstdef.publisher.push("publishToDashboard");
    //   }
    // }
    // else {
    //   for(i in $scope.wlstdef.publisher) {
    //     if($scope.wlstdef.publisher[i]=="publishToDashboard")
    //     {
    //       $scope.wlstdef.publisher.splice(i, 1);
    //     }
    //   }
    // }


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
        locals: {"data": $scope.wlstdef}
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
      $mdDialog.show({
        controller: "outputToStreams",
        templateUrl: "/design/watchlists/template/outputToStreams.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "data": $scope.wlstdef }
      }).then(function(response) {
        console.log("RESOLVED with response: ", response, " publisher in parent: ", $scope.publisherData);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " publisher in parent: ", $scope.publisherData);
      }).finally(function() {
        console.log("finally gone..!");
      });
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
        locals: { "data": $scope.wlstdef }
      }).then(function(response) {
        console.log("RESOLVED with response: ", response, " publisher in parent: ", $scope.publisherData);
      }, function(response) {
        console.log("** REJECTED ** with response: ", response, " publisher in parent: ", $scope.publisherData);
      }).finally(function() {
        console.log("finally gone..!");
      });
    };
    $scope.showOutputToStreamDialog();
  }
}]);
