angular.module('tattva')
.controller('dashboardcontroller', ['$scope','$mdDialog','$state', "$stateParams" ,'slideFactory','wlstDataService','searchFactory', 'AuthService',
function($scope,$mdDialog,$state, $stateParams, slideFactory,wlstDataService,searchFactory,AuthService) {
  $scope.orgname="wipro";
  $scope.selectedSlide = null;
  var usr = AuthService.getCurrentUser();
  $scope.watchCollection = slideFactory.getOrgWatchlists(function(data){
    $scope.watchCollection=data;
  });
  $scope.socket=io();

  if($stateParams.slidename !== null){
    $scope.currentSlide = slideFactory.getSlide($stateParams.slidename,function(data){
      $scope.currentSlide=data;
      console.log(data);
      console.log("Slide data:when stateparams is not null ", $scope.currentSlide);
    });
  }
   else {
    $scope.currentSlide = slideFactory.getDefaultSlide(function(data){
      $scope.currentSlide=data;
      console.log(data);
      console.log("Slide data: ", $scope.currentSlide);
    });
  }

  $scope.getSelectedText = function() {
    if ($scope.selectedSlide !== undefined) {
      // return "Displaying Watches from Slide: <b>" + $scope.currentSlide.slideName + "</b>";
      if($stateParams.slidename==null)
      {return "Displaying Watches from Slide: <b> Organisation Slide </b>";}
      else{return "Displaying Watches from Slide: <b>" + $scope.currentSlide+ "</b>";}
    } else {
      return "Please select an Silde";
    }
  };

  // $scope.org=slideFactory.getArrayUser($scope.orgname);
  // console.log($scope.org);
  $scope.userSlides=[];
  $scope.userSlides=slideFactory.getAllSlides(function(data){
    $scope.userSlides=data;
    console.log("Slide data: ", $scope.userSlides);
  });

  // $scope.wldata=slideFactory.getwldata($scope.username, $scope.currentSlide.slideName);
  // $scope.wlist=[];
  // for(i=0;i<$scope.wldata.length;i++)
  // {
  //   $scope.list=searchFactory.getWlObj($scope.wldata[i].id);
  //   $scope.wlist.push($scope.list);
  // }

  $scope.goToSlide = function() {
    console.log("I am asked to go to a slide ", $scope.selectedSlide)
    if($scope.selectedSlide !== undefined && $scope.selectedSlide != '' && $scope.selectedSlide !== null ) {
      console.log("Changing to slide: ", $scope.selectedSlide)
      $state.go("home", { slidename: $scope.selectedSlide } );
    }
  }

  $scope.slidecreate = function($event) {
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      targetEvent: $event,
      controller: "DialogController",
      templateUrl: "dashboard/template/createslidedialog.html",
      clickOutsideToClose:true,
      //  parent: angular.element(document.body),
      locals:{watchslidename:$scope.watchslidename}
    }).then(function(response) {
      watchslidename = response;
      console.log("watchslidename is: ", response.slidename);
      $scope.slidecreate=slideFactory.createNewSlide(response.slidename,function(data){
        $scope.slidecreate=data;
        console.log("slide created ", $scope.slidecreate);
      });
    },
    function(response) {
      console.log("**REJECTED** with response: ", response);
    }).finally(function() {
    });
  };

  $scope.addwatchlist = function($event) {
    // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      targetEvent: $event,
      controller: "addwatchlistCtrl",
      templateUrl: "dashboard/template/addwatchlistdialog.html",
      clickOutsideToClose:true,
      //  parent: angular.element(document.body),
      locals:{watchslidename:$scope.watchslidename}
    }).then(function(response) {
      watchslidename = response;
      console.log("watchslidename is: ", response);
      // $scope.createslide=slideFactory.createNewSlide(response);
    },
    function(response) {
      console.log("**REJECTED** with response: ", response);
    }).finally(function() {
    });
  };
}]);
