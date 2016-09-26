angular.module("tattva")
  .controller('WatchListCtrl', ['$scope', '$mdDialog', '$log', "$state", 'loadExprData', 'saveToDB', '$stateParams', 'selectedWlstdef', 'watchlistconfg',
    function($scope, $mdDialog, $log, $state, loadExprData, saveToDB, $stateParams, selectedWlstdef, watchlistconfg) {
      $scope.loadWatchlistData = function() {
        $scope.wlstdef = {
          namespace: "",
          stream: "",
          expressions: [],
          publishers: {
            "dashboard": {},
            "database": {},
            "outstream": {}
          }
        };
        $scope.editparams = undefined;
        $scope.editFlag = false;
        if ($stateParams.watchlistName) {
          $scope.editparams = $stateParams.watchlistName;
          $scope.getOutcomeOptions = watchlistconfg.getOutcomeOptions();
          $scope.editNamespace = $stateParams.watchlistName;
          if (selectedWlstdef)
            $scope.wlstdef = selectedWlstdef;
          $scope.editFlag = true;
        }
      }

      $scope.removeExpression = function(index, expr) {
        if (index === 0) {
          if ($scope.wlstdef.expressions[index].child) {
            var flag = 0;
            for (var i = 0; i < $scope.wlstdef.expressions.length; i++) {
              if (($scope.wlstdef.expressions[i].watch.lfield.fieldType == "PrevExprResult" || $scope.wlstdef.expressions[i].watch.rfield.fieldType == "PrevExprResult") && ($scope.wlstdef.expressions[index].tag === ($scope.wlstdef.expressions[i].watch.lfield.exprtag || $scope.wlstdef.expressions[i].watch.rfield.exprtag))) {
                flag = 1;
                break;
              }
            }
            if (flag === 1) {
              $scope.showAlert(index);
            } else {
              $scope.wlstdef.expressions[index + 1].parent = "";
              $scope.wlstdef.expressions.splice(index, 1);
            }
          }
        } else if (index === $scope.wlstdef.expressions.length - 1) {
          $scope.wlstdef.expressions[index - 1].child = "";
          $scope.wlstdef.expressions.splice(index, 1);
        } else {
          if ($scope.wlstdef.expressions[index].child) {
            var flag = 0;
            for (var i = index + 1; i < $scope.wlstdef.expressions.length; i++) {
              if (($scope.wlstdef.expressions[i].watch.lfield.fieldType == "PrevExprResult" || $scope.wlstdef.expressions[i].watch.rfield.fieldType == "PrevExprResult") && ($scope.wlstdef.expressions[index].tag === ($scope.wlstdef.expressions[i].watch.lfield.exprtag || $scope.wlstdef.expressions[i].watch.rfield.exprtag))) {
                flag = 1;
                break;
              } else if (($scope.wlstdef.expressions[i].watch.lfield.fieldType == "PrevExprResult" && $scope.wlstdef.expressions[i].watch.rfield.fieldType == "PrevExprResult")) {
                flag = 1;
                break;
              }
            }
            if (flag === 1) {
              $scope.showAlert(index);
            } else {
              $scope.wlstdef.expressions[index - 1].child = $scope.wlstdef.expressions[index + 1].tag;
              $scope.wlstdef.expressions[index + 1].parent = $scope.wlstdef.expressions[index - 1].tag;
              $scope.wlstdef.expressions.splice(index, 1);
            }
          }
        }
      }

      $scope.showAlert = function(index) {
        $mdDialog.show({
          parent: angular.element(document.body),
          templateUrl: '/design/watchlists/template/prevResultConfirm.html',
          locals: {
            index: index,
            wlstdef: $scope.wlstdef
          },
          controller: DialogController
        });

        function DialogController($scope, $state, $mdDialog, index, wlstdef) {
          $scope.index = index;
          $scope.wlstdef = wlstdef;
          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
          $scope.applySplice = function() {
            $mdDialog.hide();
            $scope.wlstdef.expressions.splice(index, 1);
            for (var i = index; i < $scope.wlstdef.expressions.length; i++) {
              if ($scope.wlstdef.expressions[i].watch.lfield.fieldType == "PrevExprResult" || $scope.wlstdef.expressions[i].watch.rfield.fieldType == "PrevExprResult") {
                if ($scope.wlstdef.expressions[i].watch.lfield.fieldType == "PrevExprResult") {
                  $scope.wlstdef.expressions[i].watch.lfield.exprAsText = "";
                } else {
                  $scope.wlstdef.expressions[i].watch.rfield.exprAsText = "";
                }
              }
            }
          }
        }
      }


      $scope.addNewExpression = function(index, expr) {
        $scope.wtchexpr = true;
        var newExpr = {

          "tag": ("Expression::" + ($scope.wlstdef.expressions.length + 1)),
          "parent": "",
          "child": "",
          "joinBy": "And",
          "inputStream": "",
          "watch": {
            "lfield": {
              "fieldType": "",
            },
            "rfield": {
              "fieldType": "",
            }
          },
        };
        $scope.getOutcomeOptions = watchlistconfg.getOutcomeOptions();
        $scope.index = 0;
        if (isNaN(index)) {
          $scope.index = $scope.wlstdef.expressions.length;
          if ($scope.index != 0) {
            $scope.wlstdef.expressions[$scope.index - 1].child = "Expression::" + ($scope.index + 1);
          }
          if ($scope.wlstdef.expressions.length > 0) {
            newExpr.parent = $scope.wlstdef.expressions[$scope.index - 1].tag;
          }
        } else {
          var current = newExpr;
          current.child = expr.child;
          expr.child = current.tag;
          current.parent = expr.tag;
          for (i in $scope.wlstdef.expressions) {
            if ($scope.wlstdef.expressions[i].parent == current.parent) {
              $scope.wlstdef.expressions[i].parent = current.tag;
            }
          }
          $scope.index = index + 1;
        }
        $scope.wlstdef.expressions.splice($scope.index, 0, newExpr);
      }

      $scope.savewatchlist = function() {
        $scope.showWatchManager();
        //  if ($scope.editNamespace) {
        //   saveToDB.editwatchlistdata($scope.wlstdef)
        //   .then(
        //     function(res) {
        //       console.log("ctrl success");
        //       $scope.showWatchManager();
        //     },
        //     function(res) {}
        //     );
        // } else {
        //   saveToDB.savewatchlistdata($scope.wlstdef)
        //   .then(
        //     function(res) {
        //       console.log("ctrl success");

        //     },
        //     function(res) {

        //     }
        //     );
        // }
      }

      $scope.showWatchManager = function(ev) {
        $mdDialog.show({
          controller: "watchlistManagerCtrl",
          templateUrl: "/design/watchlists/template/watchlistManager.html",
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          escapeToClose: false,
          locals: { "data": $scope.wlstdef, "edit": $scope.editparams }
        }).then(function(response) {}, function(response) {}).finally(function() {});
      };

      var flag1 = true;
      $scope.toggleOutputToStream = function() {
        if (flag1) {
          $scope.opneOutputStreamDialog = function() {
            $scope.showOutputToStreamDialog = function(ev) {
              $mdDialog.show({
                controller: "outputToStreams",
                templateUrl: "/design/watchlists/template/outputToStreams.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: false,
                locals: {
                  "data": $scope.wlstdef.publishers.outstream,
                  "publisherData": $scope.wlstdef
                }
              }).then(function(response) {}, function(response) {}).finally(function() {});
            };
            $scope.showOutputToStreamDialog();
          }
          flag1 = false;
        } else {
          $scope.wlstdef.publishers.outstream = {};
          flag1 = true;
        }
      }


      var save = true;
      $scope.toggleSavetoDB = function() {
        if (save) {
          $scope.opneSaveToDBDialogWindow = function() {
            $scope.showOutputToStreamDialog = function(ev) {
              $mdDialog.show({
                controller: "saveToDB",
                templateUrl: "/design/watchlists/template/saveToDB.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: false,
                locals: {
                  "data": $scope.wlstdef,
                  "publisherData": $scope.wlstdef.publishers.database
                }
              }).then(function(response) {}, function(response) {}).finally(function() {});
            };
            $scope.showOutputToStreamDialog();
          }
          save = false;
        } else {
          $scope.wlstdef.publishers.database = {};
          save = true;
        }
      }

      var dash = true;
      $scope.togglePublishToDashboard = function() {
        if (dash) {
          $scope.opnePublisherDialogWindow = function() {
            $scope.showUIPublisherDialog = function(ev) {
              $mdDialog.show({
                controller: "publisherCtrl",
                templateUrl: "/design/watchlists/template/publisherSetting.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                escapeToClose: false,
                locals: { "publisherData": $scope.wlstdef.publishers.dashboard, "namespace": $scope.wlstdef.namespace }
              }).then(function(dlgRes) {
                $scope.wlstdef.publishers.dashboard = dlgRes;
              }, function(dlgRes) {}).finally(function() {});
            };
            $scope.showUIPublisherDialog();
          }
          dash = false;
        } else {
          $scope.wlstdef.publishers.dashboard = {};
          save = true;
        }
      }

      $scope.watchlistCancel = function() {
        $state.go('design.watchlist.viewwatchlist');
      }

      $scope.editWatchlist = function() {
        $scope.editFlag = false;
        $scope.disableName = true;
        // $scope.wtchexpr = true;
      }
      $scope.wtchexpr = true;

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

    }

  ]);
