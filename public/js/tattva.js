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


<<<<<<< HEAD
  // .state('mainstream',
  // {
  //   url:'/streams',
  //   views: {
  //     "header" : {
  //       templateUrl: "/partials/header.html",
  //       controller: "headerCtrl"
  //     },
  //     "content@" : {
  //       templateUrl: "/partials/mainstream.html"
  //     },
  //     "footer" : {
  //       templateUrl: "/partials/footer.html"
  //     }
  //   }
  // })

// .state('design.streams',
// {
//   url:'/displayStreams',
//   templateUrl: "/partials/namespaceListView.html"
// })
//
// .state('design.streams.viewStreams',
// {
//   url:'/:namespaceobject',
//   templateUrl: "/partials/streamsView.html",
//   controller: 'VICtrl'
// })
// .state('design.streams.viewdata',
// {
//   url:'/:streamobject',
//   templateUrl: "/partials/streamsDataView.html",
//   controller: 'viewCtrl'
// })
// .state('design.create',
// {
//   url: '/create',
//   templateUrl: "/partials/streamCreate.html",
//   controller: 'createController'
// })

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

<<<<<<< HEAD
tattva.directive('dashboardlayout', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = "/partials/dashboardlayout.html";
  // directive.link = function(scope, elem, attr) {
  //   console.log("From dashboardlayout link function: " , scope.myresult.charttype);
  //   elem.getElementById('graphTab').appendchild('<mygraph type=scope.myresult.charttype></mygraph>');
  // }
  // directive.controller = function($scope) {
  //   $scope.getChartTemplate = function() { return "/partials/" + $scope.myresult.charttype + ".html"; }
  // };
  directive.scope = {
    myresult: '=result',
    mylog:'=data'
  }

  return directive;
});


tattva.controller('SalesController', ['$scope','$interval','$mdDialog', function($scope, $interval, $mdDialog){

  $scope.salesData=[
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];

  $interval(function(){
    var hour=$scope.salesData.length+1;
    var sales= Math.round(Math.random() * 100);
    $scope.salesData.push({hour: hour, sales:sales});
  }, 2000);
}]);

tattva.directive('linearChart', function($parse, $window){
  return{
    restrict:'EA',
    template:"<svg width='490' height='200'></svg>",
    link: function(scope, elem, attrs){
      var exp = $parse(attrs.chartData);

      var salesDataToPlot=exp(scope);
      var padding = 20;
      var pathClass="path";
      var xScale, yScale, xAxisGen, yAxisGen, lineFun;

      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);

      scope.$watchCollection(exp, function(newVal, oldVal){
        salesDataToPlot=newVal;
        redrawLineChart();
      });

      function setChartParameters(){

        xScale = d3.scale.linear()
        .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
        .range([padding + 5, rawSvg.attr("width") - padding]);

        yScale = d3.scale.linear()
        .domain([0, d3.max(salesDataToPlot, function (d) {
          return d.sales;
        })])
        .range([rawSvg.attr("height") - padding, 0]);

        xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(salesDataToPlot.length - 1);

        yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

        lineFun = d3.svg.line()
        .x(function (d) {
          return xScale(d.hour);
        })
        .y(function (d) {
          return yScale(d.sales);
        })
        .interpolate("basis");
      }

      function drawLineChart() {

        setChartParameters();

        svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,180)")
        .call(xAxisGen);

        svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxisGen);

        svg.append("svg:path")
        .attr({
          d: lineFun(salesDataToPlot),
          "stroke": "blue",
          "stroke-width": 2,
          "fill": "none",
          "class": pathClass
        });
      }

      function redrawLineChart() {

        setChartParameters();

        svg.selectAll("g.y.axis").call(yAxisGen);

        svg.selectAll("g.x.axis").call(xAxisGen);

        svg.selectAll("."+pathClass)
        .attr({
          d: lineFun(salesDataToPlot)
        });
      }

      drawLineChart();
    }
  };
});

tattva.directive('donutchart', function(){
  function link(scope, el, attr){

    var color = d3.scale.category10();
    // console.log(scope.myresult.value);
    var data = scope.myresult.value;
    var width = 230;
    var height =230;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
    .outerRadius(min / 2 * 0.9)
    .innerRadius(min / 2 * 0.5);

    svg.attr({width: width, height: height});
    var g = svg.append('g')
    // center the donut chart
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // add the <path>s for each arc slice
    g.selectAll('path').data(pie(data))
    .enter().append('path')
    .style('stroke', 'white')
    .attr('d', arc)
    .attr('fill', function(d, i){ return color(i) });
  }
  return {
    link: link,
    restrict: 'E'
  };
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

tattva.controller('myController', ['$scope','$state',function($scope,$state) {

  $scope.itemcollection=[
    {"wlname": "WatchlistONE",
    "charttype":"graph",
    "datatype":"data",
    "wldef":{
      "CountryName": "India",
      "CountryCode": "IND"
    },
    "value":[8, 3, 7]
  },
  {"wlname": "WatchlistSECNOD",
  "charttype":"flow",
  "datatype":"rawdata",
  "wldef":{
    "CountryName": "Pakistan",
    "CountryCode": "PAK"
  },
  "value":[15, 30, 27]
},
{	"wlname": "WatchlistTHIRD",
"charttype":"flow",
"datatype":"rawdata",
"wldef":{
  "CountryName": "America",
  "CountryCode": "USA"
},
"value":[38, 13, 70]
},
{"wlname": "WatchlistFOUR",
"charttype":"graph",
"datatype":"data",
"wldef":{
  "CountryName": "Britan",
  "CountryCode": "UK"
},
"value":[58, 32, 17]
}
];

$scope.logdata=[
  {
    "CountryName": "India",
    "CountryCode": "IND"
  },
  {
    "CountryName": "Pakistan",
    "CountryCode": "PAK"
  },
  {
    "CountryName": "America",
    "CountryCode": "USA"
  },
  {
    "CountryName": "Britan",
    "CountryCode": "UK"
  }
];

}]);

=======
>>>>>>> 8637de2f71f88c454f3bbd85eb7b914c2b927ca2
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

<<<<<<< HEAD
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

=======
>>>>>>> 8637de2f71f88c454f3bbd85eb7b914c2b927ca2
// swagat controller

// tattva.directive('query',function(){
//   var directive={};
//   directive.restrict="E";
//   directive.templateUrl="/partials/query.html";
//   return directive;
// });


// tattva.controller('routerCtrl',['$scope', '$http',function($scope, $http){
//   $scope.loadData=function()
//   {
//     $http.get('/viewStreams').then(function(response) {$scope.data = response.data;} );
//   };
//   $scope.loadData();
// }]);
//
//
// tattva.controller('VICtrl',['$scope', '$http' , '$stateParams', 'streamFactory', 'namespaceService',
//                                 function($scope, $http, $stateParams, streamFactory, namespaceService){
//   // console.log("1=",$stateParams.name);
//   $scope.objectJson=$stateParams.name;
//   console.log("from controller= " , $scope.objectJson);
//   $scope.streamResultData={};
//
//   namespaceService.getData().success(function(data){
//     //console.log("data1=",data);
//     $scope.namespace_collection=data;
//   });
//
//   $scope.getStreamData=function(objectJson){
//     $scope.streamResultData = streamFactory.sendStream(objectJson);
//     console.log("streamResult= ",$scope.streamResultData);
//   }
// }]);
//
//
// tattva.controller('viewCtrl',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
//   $scope.streamDetails=$stateParams.name;
//   console.log("sadfhs=", $stateParams);
// }]);
//
// tattva.controller('createController', ['$scope', '$http','namespaceService', 'instanceService', function($scope, $http, namespaceService, instanceService){
//
//   $scope.operator=[">", ">=", "<", "<=", "==", "!=" ]
//   namespaceService.getData().success(function(data){
//     //console.log("data1=",data);
//     $scope.namespace_collection=data;
//   });
//   instanceService.getData().success(function(data){
//     //console.log("data2=",data);
//     $scope.instance_collection=data;
//   });
//
//   $scope.save=function(){
//     // console.log("Saved");
//
//     var streamData={namespace : $scope.user_namespace.name , instance : $scope.user_instance.name , streamname : $scope.user_streamName , description : $scope.stringDescription , query : [{field: $scope.user_fields , operator: $scope.user_operator , value: $scope.user_value }] };
//     $http({
//       method : 'post',
//       url : '/filewrite',
//       data : streamData
//     }).success(function(data){
//       if(data.errors){
//         $scope.errorName = data.errors.name;
//         $scope.errorUserName = data.errors.username;
//         $scope.errorEmail = data.errors.email;
//       }
//       else{
//         $scope.message=data.message;
//       }
//     });
//   }
//
//
//   $scope.cancel=function(){
//     console.log("Cancelled");
//   }
// }]);

// tattva.service('namespaceService',['$http',function($http){
//   this.getData=function(){
//     return $http.get('/viewNamespace');
//   }
// }]);
//
// tattva.service('instanceService',['$http',function($http){
//   this.getData=function(){
//     return $http.get('/viewInstance')
//   }
// tattva.service('streamService',['$http',function($http){
//   this.getData=function(){
//     return $http.get('/viewStream')
//   }
// }]);

// tattva.factory('streamFactory',function(){
//   var streamData={
//     sendStream : function(sendData){
//       console.log("from factory=",sendData);
//
//       var result = [{
//         "namespace": "apacheTomcat",
//         "instance": "ap_instance",
//         "streamname": "stream-1a",
//         "description": "This is apache stream",
//         "query": [{
//           "field": "response code",
//           "operator": "==",
//           "value": "200"
//         }]
//       }, {
//         "namespace": "ngnix",
//         "instance": "nx_instance",
//         "streamname": "stream-2",
//         "description": "This is ngnix stream",
//         "query": [{
//           "field": "response code",
//           "operator": ">",
//           "value": "300"
//         }]
//       }];
//       return result;
//     }
//   }
//   return streamData;
// });



/*Pooja Singh*/
/*login*/
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
