angular.module("tattva")
.controller('WatchListCtrl', ['$scope','$mdDialog', '$log',"$state",'loadExprData','saveToDB','$stateParams','selectedWlstdef','watchlistconfg',
function( $scope,$mdDialog, $log,$state,loadExprData,saveToDB,$stateParams, selectedWlstdef,watchlistconfg) {
  $scope.loadWatchlistData = function(){
    $scope.wlstdef = {
      namespace:"",
      stream:"",
      expressions: [],
      publishers: {
        "dashboard": { "tabs": []},
        "database": {},
        "outstream": {}
      }
    };

    $scope.editFlag = false;
    if ( $stateParams.watchlistName) {
      $scope.editNamespace = $stateParams.watchlistName;
      if(selectedWlstdef)
      $scope.wlstdef = selectedWlstdef;
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
      if($scope.index!=0)
      {
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
      }, function(response) {
      }).finally(function() {
      });
    };
    $scope.showUIPublisherDialog();
  }

  $scope.toggleOutputToStream=function(){
    for(i in $scope.wlstdef.publisher)
    {
      if($scope.wlstdef.publisher[i].publishType=="outputToStreams")
      {
        $scope.wlstdef.publisher.splice(i,1);
      }
    }
  }


  $scope.toggleSavetoDB=function(){
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
    for(i in $scope.wlstdef.publisher)
    {
      if($scope.wlstdef.publisher[i].publishType=="publishToDashboard")
      {
        $scope.wlstdef.publisher.splice(i,1);
      }
    }
  }

  $scope.opnePublisherDialogWindow = function () {
    //$scope.publisherData = {"WatchListName": "My first watch list"};
    $scope.showUIPublisherDialog = function(ev) {
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
      }, function(dlgRes) {
      }).finally(function() {
      });
    };
    $scope.showUIPublisherDialog();
  }

  $scope.opneOutputStreamDialog = function (){
    $scope.showOutputToStreamDialog = function(ev) {
      $mdDialog.show({
        controller: "outputToStreams",
        templateUrl: "/design/watchlists/template/outputToStreams.html",
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        escapeToClose : false,
        locals: { "data": $scope.wlstdef.publishers.outstream,
        "publisherData" : $scope.wlstdef
      }
    }).then(function(response) {
    }, function(response) {
    }).finally(function() {
    });
  };
  $scope.showOutputToStreamDialog();
}

$scope.opneSaveToDBDialogWindow = function (){
  $scope.showOutputToStreamDialog = function(ev) {
    $mdDialog.show({
      controller: "saveToDB",
      templateUrl: "/design/watchlists/template/saveToDB.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      escapeToClose : false,
      locals: { "data": $scope.wlstdef,
      "publisherData" : $scope.wlstdef.publishers.database
    }
  }).then(function(response) {
  }, function(response) {
  }).finally(function() {
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
$scope.showConfirm = function(ev) {
  // Appending dialog to document.body to cover sidenav in docs app
  var confirm = $mdDialog.confirm()
  .title('Are you sure you want to cancel it')
  .ariaLabel('Lucky day')
  .targetEvent(ev)
  .ok('Yes')
  .cancel('No');
  $mdDialog.show(confirm).then(function() {
    $state.go("design.watchlist")
  }, function() {
    $state.go("design.createwatchlist")
  });
};

}]);
