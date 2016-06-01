angular.module("tattva")
.controller('output',['$scope', '$rootScope','$mdDialog','$timeout', '$q', '$log', function($scope,$rootScope,$mdDialog,$timeout, $q, $log) {
  $scope.actionButton=function(){
    var flag,flagn,flaga;
    if($scope.saveToDB) {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]==="saveToDB")
        {
          flag=1;
        }
      }
      if(flag!=1) {
        $scope.wlstdef.publisher.push("saveToDB");
      }
    }
    else {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]=="saveToDB")
        {
          $scope.wlstdef.publisher.splice(i, 1);
        }
      }
    }

    if($scope.outputStream) {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]==="outputStream")
        {
          flagn=1;
        }
      }
      if(flagn!=1) {
        $scope.wlstdef.publisher.push("outputStream");
      }
    }
    else {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]=="outputStream")
        {
          $scope.wlstdef.publisher.splice(i, 1);
        }
      }
    }

    if($scope.publishToDashboard) {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]==="publishToDashboard")
        {
          flaga=1;
        }
      }
      if(flaga!=1) {
        $scope.wlstdef.publisher.push("publishToDashboard");
      }
    }
    else {
      for(i in $scope.wlstdef.publisher) {
        if($scope.wlstdef.publisher[i]=="publishToDashboard")
        {
          $scope.wlstdef.publisher.splice(i, 1);
        }
      }
    }

  }

  $scope.opnePublisherDialogWindow = function () {
    console.log("in save");
    $scope.publisherData = {"WatchListName": "My first watch list"};
    // console.log("current slide is : ", $scope.currentSlide);
    $scope.showUIPublisherDialog = function(ev) {
      console.log("hi");
      $mdDialog.show({
        controller: "publisherCtrl",
        templateUrl: "/design/watchlists/template/publisherSetting.html",
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
    $scope.showUIPublisherDialog();
  }
}]);
