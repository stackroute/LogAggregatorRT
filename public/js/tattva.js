var tattva = angular.module('tattva', ['ngMaterial', 'ngMdIcons','ui.router','ui.ace','ngLetterAvatar']);
tattva.controller('AppCtrl', ['$scope', '$rootScope','$mdDialog', function($scope,$rootScope,$mdDialog) {

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
//     removestatement:function(){
//     //  console.log($scope.wlstdef.statements);
//     var lastItem = $scope.wlstdef.statements.length-1;
//     console.log(lastItem);
//   //  $scope.statements.splice(lastItem);
// };

$scope.savewatchlist=function(){
}
$scope.wlstdef = {
  statements: [],
  // savejoinby:function('name'){$scope.name=name,console.log($scope.name)},
  removestatement:function(){
    var lastItem = $scope.wlstdef.statements.length-1;
    this.statements.splice(lastItem);
  },
  addNewStatement: function(name) {
    if($scope.showmesecound){
      $scope.showmesecound=false;
    }
    var newStmt = {
      _id: (this.statements.length + 1),
      _joinexpressionBy:name,
      criterias: [],
      addNewClause: function(name) {
        if($scope.showmefirst){
          $scope.showmefirst=false;
        }
        var newClause = {_id: (this.criterias.length + 1),_joinby:name };
        this.criterias.push(newClause);
      },
      removecriterias:function(){
        var lastItem = this.criterias.length-1;
        this.criterias.splice(lastItem);
      }
    }
    this.statements.push(newStmt);
  }
}
}
// modal


]);

tattva.service('wlstDataService', ['$http', function($http){
  this.getData = function() {
    return $http.get('/fileFetch');
  }
}]);



tattva.config(function($mdThemingProvider) {
  var primary = $mdThemingProvider.extendPalette('red', {
    '500': '00BCD4'
  });

  $mdThemingProvider.definePalette('primary', primary);

  $mdThemingProvider.theme('default')
  .primaryPalette('primary')
  .accentPalette('light-blue')
  .warnPalette('green');
});

tattva.config(['$stateProvider','$urlRouterProvider', function($stateProvider){
  $stateProvider
  .state('guest',
  {
    url:"/tattva",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content" : {
        templateUrl: "/partials/content.html"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      },
    }
  })
  .state('login',
  {
    url: "/login",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/login.html",
        controller:'LoginCtrl'
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })
  // .state('user',
  // {
  //   url: "/dashboard",
  //   views: {
  //     "header" : {
  //       templateUrl: "/partials/header.html",
  //       controller: "headerCtrl"
  //     },
  //     "content@" : {
  //       templateUrl: "/partials/dashboard.html"
  //     },
  //     "footer" : {
  //       templateUrl: "/partials/footer.html"
  //     }
  //   }
  // })

  .state('organisation',
  {
    url: "/organisation",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/Admin_Page.html",
        controller: "orgCtrl"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }
  })

  .state('design',{

    url: "/design",
    views: {
      "header" : {
        templateUrl: "/partials/header.html",
        controller: "headerCtrl"
      },
      "content@" : {
        templateUrl: "/partials/design.html",
        controller: "orgCtrl"
      },
      "footer" : {
        templateUrl: "/partials/footer.html"
      }
    }

  })
  .state('design.instance',
  {
    url: "/instance",
    templateUrl: "/partials/instance.html",
    controller: "instCtrl"
  })
  .state('design.instance.addInstance',{
    url:"/addInstance",
    controller:"instCtrl"
  })
  .state('design.instance.viewInstance', {
    url: "/:name",
    templateUrl:"partials/viewInstance.html",
    controller:"viewinstCtrl"
  })
  /*  .state('instance.listInstance', {
  url: "/instance/listInstance",
  templateUrl: "partials/listInstance.html"
  // controller:"createInstanceCtrl"
})*/
.state('instance.submitInstance', {
  url: "/submitInstance",
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "partials/listInstance.html",
      controller:"instCtrl"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }

})

.state('instance.submitInstance.viewInstance.createInstance',{
  url:"/createdialogInstance/:nspname",
  controller:"InstDialogctrl"
})


// .state('mainstream.streams',
// {
//   url:'/streams',
//   views: {
//     "header" : {
//       templateUrl: "/partials/header.html",
//       controller: "headerCtrl"
//     },
//     "content@" : {
//       templateUrl: "/partials/indexview.html"
//     },
//     "footer" : {
//       templateUrl: "/partials/footer.html"
//     }
//   }
// })
.state('design.function',
{
  url:'/function',
  templateUrl: "partials/functionlist.html",
  controller:"functionlistCtrl"

})
.state('design.functionEdit', {
  url: '/functional/:functionname',
  templateUrl: '/partials/cfunctions.html',
  controller: 'functionEditCtrl'
  // params: { function_name :'function_name' }
})

.state('design.addfunction', {
  url:"/addFunction",
  templateUrl:"partials/cfunctions.html"
})


.state('mainstream',
{
  url:'/streams',
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "/partials/mainstream.html"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }
})

.state('mainstream.streams',
{
  url:'/streams',
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "/partials/indexView.html"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }
})
.state('mainstream.streams.viewStreams',
{
  url:'/:name',
  templateUrl: "/partials/viewStreams.html",
  controller: 'VICtrl'
})
.state('mainstream.streams.viewdata',
{
  url:'/:name',
  templateUrl: "/partials/viewdata.html",
  controller: 'viewCtrl'
})
.state('mainstream.streams.create',
{
  url: '/create',
  templateUrl: "/partials/indexCreate.html",
  controller: 'createController'
})


.state('design.namespace', {
  url: "/namespace",
  templateUrl: "partials/namespace.html",
  controller:"createNamespaceCtrl"
})
.state('namespace.listNameSpace', {
  url: "/namespace/listNameSpace",
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "partials/listNamespace.html",
      controller:"createNamespaceCtrl"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }

})
.state('namespace.createNamespace', {
  url: "/createNamespace",
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl: "partials/createNamespace.html",
      controller:"createNamespaceCtrl"
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }


})

.state('design.watchlist',
{
  url:'/watchlist',
  templateUrl: "/partials/watchlists.html"
})


.state('design.watchlist.publish',
{
  url: "/publish",
  controller: "publishCtrl"
})

.state('watchlist.create', {
  url:'/new',
  views: {
    "header" : {
      templateUrl: "/partials/header.html",
      controller: "headerCtrl"
    },
    "content@" : {
      templateUrl:'/partials/newwatchlist.html',
      controller: 'AppCtrl'
    },
    "footer" : {
      templateUrl: "/partials/footer.html"
    }
  }
})
}]);

tattva.controller('AppRouteCtrl', function($scope,$mdSidenav, $state, $anchorScroll, $location) {

  $state.go('guest');

  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  //  $scope.hideSignIn=function(){
  //    $scope.login=false;
  //  }

  $scope.login = function() {
    $scope.isMember=true;
    $scope.signOut=true;
    $scope.login=false;
    $state.go('user');
  };

  $scope.signout = function(){
    $scope.isMember=false;
    $scope.signOut=false;
    $scope.login=true;
    $state.go('guest');
  }

  $scope.gotoSlide1 = function(){
    $location.hash('slide1');
    $anchorScroll();
  }
  $scope.gotoSlide2 = function(){
    $location.hash('slide2');
    $anchorScroll();
  }
  $scope.gotoSlide3 = function(){
    $location.hash('footer');
    $anchorScroll();
  }
  $scope.gotohead = function(){
    $location.hash('head');
    $anchorScroll();
  }
});

tattva.controller('headerCtrl',function($scope,$http){
  $scope.header="TATTVA - CEP";
  $http.get("/json/guestMenu.json").success(function(data){
    $scope.items=data;
  });


});


// tattva.directive('mygraph', function() {
//   return {
//     template: '<div ng-include src="computeUrl(myresult.charttype)"></div>',
//     controller: function($scope) {
//       $scope.computeUrl = function(url) {
//         return "/partials/"+url+".html";
//       }
//     }
//   };
// });

tattva.controller('gotoWatchlist',['$scope','$state',function($scope,$state){
  $scope.edit_watchlist=function (){
    console.log("go to watchlist");
    $state.go("design.watchlist");
  }
}]);

tattva.controller('data_1_Ctrlr', function($scope, $mdDialog, $http) {
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

  $scope.selectedUserIndex1 = undefined;
  $scope.selectUserIndex1 = function (index) {
    if ($scope.selectedUserIndex1 !== index) {
      $scope.selectedUserIndex1 = index;
    }
    else {
      $scope.selectedUserIndex1 = undefined;
    }
  };

  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)">'+
      '<md-content class="md-padding"> <form name="userForm" ng-submit="saveData()">'+
      '<div layout layout-sm="column">'+
      '<md-input-container flex> <label>User Name</label> <input ng-model="uName"> </md-input-container> '+
      '</div>'+
      '<md-input-container flex> <label>Email ID</label> <input ng-model="uEmail"> </md-input-container>'+
      '<div layout layout-sm="column">'+
      '<md-input-container flex> <label>Password</label> <input ng-model="uPassword"> </md-input-container>'+
      '</form> </md-content> <div class="md-actions" layout="row"> '+
      '<span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button>'+
      ' <md-button type="submit" class="md-primary"> Save </md-button>'+
      ' </div>'+
      '</md-dialog>',
      targetEvent: ev,
    });

  }

  $scope.deleteMe = function(ev) {
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
    /*console.log(data1);*/

    $http({
      method  : 'POST',
      url     : '/login_reg1',
      data    : data1 //forms user object
      // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .success(function(data) {
      if (data.errors) {
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

// swagat controller

tattva.directive('query',function(){
  var directive={};
  directive.restrict="E";
  directive.templateUrl="/partials/query.html";
  return directive;
});


tattva.controller('routerCtrl',['$scope', '$http',function($scope, $http){
  $scope.loadData=function()
  {
    $http.get('/viewStreams').then(function(response){ $scope.data = response.data;});
    // console.log(response.data);
    // console.log("view streams");
  };
  $scope.loadData();
}]);

tattva.controller('VICtrl',['$scope', '$http' , '$stateParams',function($scope,$http,$stateParams){
  // console.log("1=", $stateParams.name);
  $scope.objectJson=JSON.parse($stateParams.name);
  // console.log("2=",typeof $stateParams.name);
  $scope.params=$scope.objectJson.streams;
  $scope.avatar=$scope.objectJson.instance;
}]);

tattva.controller('viewCtrl',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $scope.value=JSON.parse($stateParams.name);
  //console.log($scope.value);
}]);

tattva.controller('createController', ['$scope', '$http','namespaceService', 'instanceService', function($scope, $http, namespaceService, instanceService){

  $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]
  namespaceService.getData().success(function(data){
    $scope.namespace_collection=data;
  });
  instanceService.getData().success(function(data){
    $scope.instance_collection=data;
  });

  $scope.save=function(){
    // console.log("Saved");

    var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , nameofstream : $scope.user_streamName , description : $scope.stringDescription , query : {field: $scope.user_fields , operator: $scope.user_operator , value: $scope.user_value}};
    /**/
    $http({
      method : 'post',
      url : '/filewrite',
      data : streamData
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
  }
  $scope.cancel=function(){
    /*console.log("Cancelled");*/
  }
}]);


tattva.service('namespaceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewNamespace');
  }
}]);

tattva.service('instanceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewInstance')
  }
}]);



/*Pooja Singh*/
/*login*/
tattva.controller('orgCtrl', function($scope, $mdDialog, $http) {
  //Your controller code goes here
  $scope.loadData = function() {
    $http.get('/org_admin').then(function(response){ $scope.data = response.data; });
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

  $scope.selectedUserIndex1 = undefined;
  $scope.selectUserIndex1 = function (index) {
    if ($scope.selectedUserIndex1 !== index) {
      $scope.selectedUserIndex1 = index;
    }
    else {
      $scope.selectedUserIndex1 = undefined;
    }
  };

  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)">'+
      '<md-content class="md-padding"> <form name="userForm" ng-submit="saveData()">'+
      '<div layout layout-sm="column">'+
      '<md-input-container flex> <label>User Name</label> <input ng-model="uName"> </md-input-container> '+
      '</div>'+
      '<md-input-container flex> <label>Email ID</label> <input ng-model="uEmail"> </md-input-container>'+
      '<div layout layout-sm="column">'+
      '<md-input-container flex> <label>Password</label> <input ng-model="uPassword"> </md-input-container>'+
      '</form> </md-content> <div class="md-actions" layout="row"> '+
      '<span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button>'+
      ' <md-button type="submit" class="md-primary"> Save </md-button>'+
      ' </div>'+
      '</md-dialog>',
      targetEvent: ev,
    });

  }

  $scope.deleteMe = function(ev) {
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

tattva.controller('LoginCtrl', ['$scope', '$http', '$state',
function($scope, $http, $state) {
  //Your controller code goes here
  $scope.loadData = function() {
    // $http.get('/login_reg').then(function(response){

    var tabs = [
      { title: 'Login'},
      { title: 'Register'}

    ],
    selected = null,
    previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      $scope.user = {
        site:'',
        orgn:'',
        location:'',
        name:'',
        email:'',
        pwd:'',
        cfpwd:''
      }
    });

    //})
  };
  $scope.loadData();

  $scope.signUp=function(){
    $scope.selectedIndex=1;
  }
  $scope.signIn=function(){
    $scope.selectedIndex=0;
  }
}



]);

tattva.controller("instCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){

  $scope.selectedIndex = 1;
  $scope.submitInstance=function()
  {
    $state.go('instance.submitInstance');

  }
  $scope.loadData=function(){
    $http.get('/submitInstance').then(function(response){
      $scope.data = response.data;
    });
  }
  $scope.loadData();

  $scope.status='';
  $scope.customFullscreen=$mdMedia('xs') || $mdMedia('sm');
  $scope.addInstance= function($event){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      targetEvent: $event,
      controller: DialogController,
      templateUrl: "partials/createInstanceDialog.html",
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      parent: angular.element(document.body),
      scope: $scope


    }).then(function(answer) {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

    function DialogController($scope,$state, $mdDialog,$http){

      $http.get('/submitInstance').then(function(response){
        $scope.namespaceSelect = response.data;
      });

      /*console.log($scope.nspname);*/
      $scope.dInstance={
        namespace:"",
        name:"",
        ipAddress:"",
        port:"",
        description:"",
        location:""

      };

      $scope.instanceSubmit=function(){

        var data={
          instance:$scope.dInstance
        };
        $http({
          method:'POST',
          url:'/createdialogInstance',
          data: data
        })
        .success(function(response) {

          if (data.errors) {
            $scope.errorName = data.errors.name;
            $scope.errorUserName = data.errors.username;
            $scope.errorEmail = data.errors.email;
          } else {

            $scope.data=response;
            /*$state.go("design.submitInstance.viewInstance({name: '"+$scope.nspname+"' })");*/
          }



        });

        $mdDialog.hide();

      }

    }
  }



}]);

tattva.controller("viewinstCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){
  $scope.nspname=$stateParams.name;
  $scope.loadData = function() {
    $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
  }
  $scope.loadData();
  $scope.show="false";

  $scope.dspDetail=function()
  { if($scope.show==="false")
  {
    $scope.show="true";
  }
  else
  {
    $scope.show="false";
  }

}

}]);


tattva.controller("InstDialogctrl",["$scope","$state","$http","$stateParams",function($scope,$state,$http,$stateParams){
  $scope.fetchnspname=$stateParams.nspname;
  /*console.log("hello");*/
  /*$scope.loadData = function() {
  $http.get("/data/"+ $scope.nspname).then(function(response){ $scope.instance = response.data;});
}
$scope.loadData();*/
}]);


/*functions*/
tattva.controller('functionlistCtrl', ['$scope', '$http','$mdDialog',
function($scope, $http, $mdDialog) {

  $scope.loadData = function() {
    $http.get('/func_link').then(function(response){ $scope.data = response.data; });
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

  $scope.selectedUserIndex1 = undefined;
  $scope.selectUserIndex1 = function (index) {
    if ($scope.selectedUserIndex1 !== index) {
      $scope.selectedUserIndex1 = index;
    }
    else {
      $scope.selectedUserIndex1 = undefined;
    }
  };

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
}
]);



tattva.controller('functionEditCtrl', ['$scope', '$http','$mdDialog','$stateParams',
function($scope, $http, $mdDialog,$stateParams) {

  var name=$stateParams.functionname;
  $scope.loadData = function() {
    $http.get('/func_link_data').then(function(response){ $scope.data = response.data;
      for(var i in $scope.data) {
        if($scope.data[i].fun_name===name){
          $scope.function=$scope.data[i];
        }

      }
    });
  }
  $scope.loadData();
  // console.log("outside"+$scope.data);
  $scope.saveData=function(){
    var item={fun_name:$scope.data[0].fun_name,Descr:$scope.data[0].Descr,var:$scope.data[0].var,fun:$scope.data[0].fun};
    /*console.log(item);
    */
    $http({
      method  : 'POST',
      url     : '/func_send_data',
      data    : item //forms user object
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
  };

}
]);
tattva.controller("createNamespaceCtrl",["$scope","$state","$http","$mdToast","$document",function($scope, $state, $http, $mdToast, $document){
  $scope.nameSpace = {
    dataSchema: []
  };
  var keyIndex=0;
  $scope.nameSpaceListdata=[];
  var jsonNew=[];

  $scope.loadData=function()
  {
    $http.get("/nameSpaceList").then(function(response) {
      $scope.nameSpaceListdata = response.data;
    });
  };
  $scope.delete = function(index){
    /*console.log("index = "+ index+"    index type ="+typeof index);*/
    $scope.nameSpace.dataSchema.splice(index,1);
  }
  $scope.addDataFormat = function(){
    var newSchemaField = { 'fieldAlias': $scope.fieldAlias, 'fieldName': $scope.fieldName, 'fieldType': $scope.fieldType };
    $scope.nameSpace.dataSchema.push(newSchemaField);
    $scope.fieldAlias = $scope.fieldName = $scope.fieldType = "";
  }

  $scope.createNamespaceSubmit = function(){
    var toast = $mdToast.simple()
    .textContent('Namespace ' + $scope.name+' is created!')
    .action('OK')
    .highlightAction(false)
    .hideDelay(3000)
    .position("bottom right");
    $mdToast.show(toast).then(function(response) {

      $state.go("namespace.listNameSpace");
    });

    // $http({
    //   method  : 'POST',
    //   url     : '/createNamespacePost',
    //   data    : $scope.nameSpace.dataSchema
    //   // headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    // })
    // .success(function(data) {
    //   // if (data.errors) {
    //   //   $scope.errorName = data.errors.name;;
    //   // } else {
    //   //   $scope.message = data.message;
    //   // }
    // });

  }

}]);
// publishui controlller

tattva.controller("publishCtrl",["$scope","$state","$http","$stateParams","$mdDialog","$mdMedia",function($scope,$state,$http,$stateParams,$mdDialog,$mdMedia){

  // $scope.selectedIndex = 1;
  // $scope.submitInstance=function()
  // {
  //   $state.go('instance.submitInstance');
  //
  // }
  // $scope.loadData=function(){
  //   $http.get('/submitInstance').then(function(response){
  //        $scope.data = response.data;
  //   });
  // }
  // $scope.loadData();

  $scope.status='';
  $scope.customFullscreen=$mdMedia('xs') || $mdMedia('sm');
  console.log("hello");
  $scope.publish= function($event){

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      targetEvent: $event,
      controller: publishDialog,
      templateUrl: "partials/publish.html",
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      parent: angular.element(document.body),
      scope: $scope


    }).then(function(answer) {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

    function publishDialog($scope,$state, $mdDialog,$http){
      $http.get('/submitInstance').then(function(response){
        $scope.namespaceSelect = response.data;
      });

      /*console.log($scope.nspname);*/
      $scope.dInstance={
        namespace:"",
        name:"",
        ipAddress:"",
        port:"",
        description:"",
        location:""

      };

      $scope.instanceSubmit=function(){

        var data={
          instance:$scope.dInstance
        };
        $http({
          method:'POST',
          url:'/createdialogInstance',
          data: data
        })
        .success(function(response) {

          if (data.errors) {
            $scope.errorName = data.errors.name;
            $scope.errorUserName = data.errors.username;
            $scope.errorEmail = data.errors.email;
          } else {

            $scope.data=response;
            /*$state.go("design.submitInstance.viewInstance({name: '"+$scope.nspname+"' })");*/
          }

        });
        $mdDialog.hide();
      }

    }
  }

}]);
