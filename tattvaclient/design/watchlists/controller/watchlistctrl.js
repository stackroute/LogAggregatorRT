angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$mdDialog', '$log',"$state",'loadExprData','saveToDB','$stateParams','selectedWlstdef','watchlistconfg',
function( $scope,$mdDialog, $log,$state,loadExprData,saveToDB,$stateParams, selectedWlstdef,watchlistconfg) {
  $scope.loadWatchlistData = function(){
    $scope.wlstdef = {
      namespace:"",
      stream:"",
      expressions: [],
      publishers: {
        "dashboard": {},
        "database": {},
        "outstream": {}
      }
    };

    $scope.editFlag = false;
    if ( $stateParams.watchlistName) {
      $scope.editNamespace = $stateParams.watchlistName;
      if(selectedWlstdef)
        $scope.wlstdef = selectedWlstdef;
      console.log($scope.wlstdef);
      $scope.editFlag = true;
    }
  }

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
    $scope.getOutcomeOptions=watchlistconfg.getOutcomeOptions();
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

    if ($scope.editNamespace) {
      saveToDB.editwatchlistdata($scope.wlstdef);
    }
    else{
      saveToDB.savewatchlistdata($scope.wlstdef);
    }
    $scope.showUIPublisherDialog = function(ev) {
      $mdDialog.show({
        controller: "watchlistManagerCtrl",
        templateUrl: "/design/watchlists/template/watchlistManager.html",
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

  $scope.toggleOutputToStream=function(){
    console.log("outputToStreams");
    console.log("hi")
    for(i in $scope.wlstdef.publisher)
    {
      if($scope.wlstdef.publisher[i].publishType=="outputToStreams")
      {
        $scope.wlstdef.publisher.splice(i,1);
      }
    }
  }


  $scope.toggleSavetoDB=function(){
    console.log("hi");
    var flag;
    for(i in $scope.wlstdef.publisher)
    {
      if($scope.wlstdef.publisher[i].publishType=="saveToDB")
      {
        $scope.wlstdef.publisher.splice(i,1);
      }
    }
  }

  $scope.togglePublishToDashboard=function(){
    console.log("hi")
    for(i in $scope.wlstdef.publisher)
    {
      if($scope.wlstdef.publisher[i].publishType=="publishToDashboard")
      {
        $scope.wlstdef.publisher.splice(i,1);
      }
    }
  }

  $scope.opnePublisherDialogWindow = function () {
    console.log("in save");
    //$scope.publisherData = {"WatchListName": "My first watch list"};
    $scope.showUIPublisherDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "publisherCtrl",
        templateUrl: "/design/watchlists/template/publisherSetting.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: {"publisherData": $scope.wlstdef.publishers.dashboard }
      }).then(function(dlgRes) {
        $scope.wlstdef.publishers.dashboard = dlgRes;
        console.log("RESOLVED with response: ", dlgRes, " publisher in parent: ", $scope.wlstdef.publishers.dashboard);
      }, function(dlgRes) {
        console.log("** REJECTED ** with response: ", dlgRes, " publisher in parent: ", $scope.wlstdef.publishers.dashboard);
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

  $scope.watchlistCancel = function(){
    $state.go('design.watchlist.viewwatchlist');
  }

  $scope.editWatchlist = function(){
    $scope.editFlag = false;
  }

}]);
