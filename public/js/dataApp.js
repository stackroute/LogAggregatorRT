// var dataApp = angular.module('dataApp', ['ngRoute','ngMaterial', 'ngMessages','ngMdIcons','xeditable']);
//
// dataApp.config(['$routeProvider', function($routeProvider) {
// 	$routeProvider.
// 	when('/login_reg', {
// 		templateUrl: '/partials/login_reg.html',
// 		controller: 'data_1_Ctrlr'
// 	}).
// 	otherwise({
// 		redirectTo: '/'
// 	});
//
// }]);


var dataApp = angular.module('dataApp', ['ui.router','ngMaterial', 'ngMessages','ngMdIcons','xeditable']);

dataApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('inbox', {
    // url: '',
    // template: '<h1>Hello World!!!</h1><div style="width:100px;height:300px;border:1px solid #000;left:200px;top:70px;position: relative;"><div style="width:100px;height:300px;border:1px solid #000;left:250px;position: absolute;"><div style="width:100px;height:300px;border:1px solid #000;left:300px;position: absolute;">'
		templateUrl: '/partials/login_reg.html',
		controller: 'data_1_Ctrlr'

	});
});


// dataApp.config(function($mdIconProvider) {
//   $mdIconProvider
//     .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
//     .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
//     .iconSet('communication', 'image/images1.jpg', 24)
//     .defaultIconSet('img/icons/sets/core-icons.svg', 24);
// });
dataApp.controller('data_1_Ctrlr', function($scope, $mdDialog, $http) {
		//Your controller code goes here
		$scope.loadData = function() {
			$http.get('/login_reg').then(function(response){ $scope.data = response.data; });
		}
		$scope.loadData();



    $scope.selectedUserIndex = undefined;
    $scope.selectUserIndex = function (index) {
      if ($scope.selectedUserIndex !== index) {
        $scope.selectedUserIndex = index;
      }
      else {
        $scope.selectedUserIndex = undefined;
      }
    };

		$scope.showAdd = function(ev) {
	 $mdDialog.show({
		 controller: DialogController,
		 template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>User Name</label> <input ng-model="uName"> </md-input-container> </div> <md-input-container flex> <label>Email ID</label> <input ng-model="uEmail"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>Password</label> <input ng-model="uPassword"> </md-input-container></form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="saveData()" class="md-primary"> Save </md-button> </div></md-dialog>',
		 targetEvent: ev,
	 });
	//  .then(function(answer) {
	// 	 $scope.alert = 'You said the information was "' + answer + '".';
	//  }, function() {
	// 	 $scope.alert = 'You cancelled the dialog.';
	//  });
 };

 // dataservice.getData().success(function() {
 //   $scope.data=data;
 //  //  console.log(data[0]);
 // });
 //
 // $scope.addData= function() {
 //   $scope.data.push({name:$scope.uname,email:$scope.uEmail,password:$scope.uPassword});
 //  //  console.log($scope.data);
 // }


 $scope.deleteMe = function(ev) {
  //  Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Delete')
          .textContent('Are you surely want to delete.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');
    $mdDialog.show(confirm);
  };
});

function DialogController($scope, $mdDialog,$http) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.saveData=function(){
    var data1={};
    data1={name:$scope.uName,email:$scope.uEmail,password:$scope.uPassword};
    console.log(data1);

    // $scope.loadData1 = function() {
		// 	$http.get('/login_reg').then(function(response){ $scope.data = response.data; });
		// }
    // $scope.data.push(data1);
    // console.log($scope.data);

    $http({
          method  : 'POST',
          url     : '/login_reg1',
          data    : data1 //forms user object
          // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .success(function(data) {
            if (data.errors) {
              // Showing errors.
              $scope.errorName = data.errors.name;
              $scope.errorUserName = data.errors.username;
              $scope.errorEmail = data.errors.email;
            } else {
              $scope.message = data.message;
            }
          });

          $mdDialog.hide();

  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

// dataApp.service('dataService',function($http) {
//   this.getData=function() {
//     return $http.get('/login_reg');
//   }
// });
