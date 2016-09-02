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
$scope.editparams=undefined;
    $scope.editFlag = false;
    if ( $stateParams.watchlistName) {
    $scope.editparams=$stateParams.watchlistName;
    $scope.getOutcomeOptions=watchlistconfg.getOutcomeOptions();
      $scope.editNamespace = $stateParams.watchlistName;
      if(selectedWlstdef)
      $scope.wlstdef = selectedWlstdef;
      $scope.editFlag = true;
    }
  }

  $scope.removeExpression=function(index,expr) {
      if(index===0){
        $scope.wlstdef.expressions[index+1].parent="";
      }
      else if(index===$scope.wlstdef.expressions.length-1){
        $scope.wlstdef.expressions[index-1].child="";
      }
      else{
        $scope.wlstdef.expressions[index-1].child=$scope.wlstdef.expressions[index+1].tag;
        $scope.wlstdef.expressions[index+1].parent=$scope.wlstdef.expressions[index-1].tag;
      }
      $scope.wlstdef.expressions.splice(index,1);
    }


    $scope.addNewExpression=function(index,expr) {
      // console.log("$scope.index:",$scope.index);
      // console.log("index:",index);
        var newExpr = {
          "tag": ("Expression::" + ($scope.wlstdef.expressions.length + 1)),
          "parent":"",
          "child":"",
          "joinBy": "And",
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
        $scope.getOutcomeOptions=watchlistconfg.getOutcomeOptions();
        $scope.index = 0;
        if(isNaN(index)){
          $scope.index = $scope.wlstdef.expressions.length;
          if($scope.index!=0)
          {
            // console.log($scope.index);
            $scope.wlstdef.expressions[$scope.index-1].child="Expression::"+($scope.index+1);
          }
          if($scope.wlstdef.expressions.length>0)
          {
            // console.log($scope.index,$scope.wlstdef.expressions.length);
            // console.log($scope.wlstdef.expressions[0]);
            newExpr.parent=$scope.wlstdef.expressions[$scope.index-1].tag;
          }
        }
        else{
          var current=newExpr;
          current.child=expr.child;
          expr.child=current.tag;
          current.parent=expr.tag;
          for(i in $scope.wlstdef.expressions)
          {
            if($scope.wlstdef.expressions[i].parent==current.parent)
            {
              $scope.wlstdef.expressions[i].parent=current.tag;
            }
          }
          $scope.index = index+1;
        }
        $scope.wlstdef.expressions.splice($scope.index,0,newExpr);
      }

  $scope.savewatchlist=function()
  {
    if ($scope.editNamespace) {
      saveToDB.editwatchlistdata($scope.wlstdef)
      .then(
        function(res){
            console.log("ctrl success");
          $scope.showWatchManager();
        },
        function(res){
        }
      );
    }
    else{
      saveToDB.savewatchlistdata($scope.wlstdef)
      .then(
        function(res){
            console.log("ctrl success");
          $scope.showWatchManager();
        },
        function(res){

        }
      );
    }
    // $scope.showUIPublisherDialog = function(ev) {
    //   $mdDialog.show({
    //     controller: "watchlistManagerCtrl",
    //     templateUrl: "/design/watchlists/template/watchlistManager.html",
    //     parent: angular.element(document.body),
    //     targetEvent: ev,
    //     clickOutsideToClose: false,
    //     escapeToClose : false,
    //     locals: {"data": $scope.wlstdef,"edit":$scope.editparams}
    //   }).then(function(response) {
    //   }, function(response) {
    //   }).finally(function() {
    //   });
    // };
    // $scope.showUIPublisherDialog();
  }

  $scope.showWatchManager = function(ev) {
    $mdDialog.show({
      controller: "watchlistManagerCtrl",
      templateUrl: "/design/watchlists/template/watchlistManager.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      escapeToClose : false,
      locals: {"data": $scope.wlstdef,"edit":$scope.editparams}
    }).then(function(response) {
    }, function(response) {
    }).finally(function() {
    });
  };

  var flag1 =true;
  $scope.toggleOutputToStream=function(){
    if (flag1){
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
      flag1=false;
    } else {
      $scope.wlstdef.publishers.outstream={};
      flag1=true;
    }
  }


  var save=true;
  $scope.toggleSavetoDB=function(){
    if (save) {
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
      save=false;
    } else {
      $scope.wlstdef.publishers.database={};
      save=true;
    }
  }

  var dash=true;
  $scope.togglePublishToDashboard=function(){
    if(dash){
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
            locals: {"publisherData": $scope.wlstdef.publishers.dashboard,"namespace":$scope.wlstdef.namespace }
          }).then(function(dlgRes) {
            $scope.wlstdef.publishers.dashboard = dlgRes;
          }, function(dlgRes) {
          }).finally(function() {
          });
        };
        $scope.showUIPublisherDialog();
      }
      dash = false;
    } else {
      $scope.wlstdef.publishers.dashboard={};
      save=true;
    }
  }

$scope.watchlistCancel = function(){
  $state.go('design.watchlist.viewwatchlist');
}

$scope.editWatchlist = function(){
  $scope.editFlag = false;
}

// $scope.removeWatchlist = function(){
//   saveToDB.removeWatchlist($scope.wlstdef)
//   .then(
//     function(res){
//         console.log("watchlist removed");
//         $state.go('design.watchlist');
//     },
//     function(res){
//
//     }
//   );
// }
// $scope.showRemoveConfirm = function(ev) {
//     var confirm = $mdDialog.confirm()
//           .title('Would you like to delete your watchlist?')
//           .targetEvent(ev)
//           .ok('Confirm')
//           .cancel('Cancel');
//     $mdDialog.show(confirm).then(function() {
//       $scope.removeWatchlist();
//     }, function() {
//       $scope.status = 'You decided to keep your watchlist.';
//     });
//   };
  $scope.showEditConfirm = function(ev) {
      var confirm = $mdDialog.confirm()
            .title('Would you like to stop currently running watclist?')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        $scope.editWatchlist();
      }, function() {
        $scope.status = 'You decided to keep your watchlist.';
      });
    };
// $scope.showConfirm = function(ev) {
//   // Appending dialog to document.body to cover sidenav in docs app
//   var confirm = $mdDialog.confirm()
//   .title('Are you sure you want to cancel it')
//   .ariaLabel('Lucky day')
//   .targetEvent(ev)
//   .ok('Yes')
//   .cancel('No');
//   $mdDialog.show(confirm).then(function() {
//     $state.go("design.watchlist")
//   }, function() {
//     $state.go("design.createwatchlist")
//   });
// };

}]);
