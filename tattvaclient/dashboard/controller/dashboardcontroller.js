angular.module('tattva')
.controller('dashboardcontroller', ['$scope','$mdDialog','$state', "$stateParams" ,'slideFactory','searchFactory',
function($scope,$mdDialog,$state, $stateParams, slideFactory,searchFactory) {
  $scope.username="prarthana";
  $scope.orgname="wipro";

  $scope.selectedSlide = null;
  if($stateParams.slidename !== null){
    $scope.currentSlide = slideFactory.getSlide($scope.username, $stateParams.slidename);
  } else {
    $scope.currentSlide = slideFactory.getDefaultSlide($scope.username);
  }

  $scope.getSelectedText = function() {
    if ($scope.selectedSlide !== undefined) {
      return "Displaying Watches from Slide: <b>" + $scope.currentSlide.slideName + "</b>";
    } else {
      return "Please select an Silde";
    }
  };
  // $scope.org=slideFactory.getArrayUser($scope.orgname);
  $scope.userSlides=slideFactory.getAllSlides($scope.username);
  $scope.wldata=slideFactory.getwldata($scope.username, $scope.currentSlide.slideName);
  $scope.wlist=[];
  for(i=0;i<$scope.wldata.length;i++)
  {
    $scope.list=searchFactory.getWlObj($scope.wldata[i].id);
    $scope.wlist.push($scope.list);
  }
  $scope.goToSlide = function() {
    if($scope.selectedSlide !== undefined && $scope.selectedSlide != '' && $scope.selectedSlide !== null ) {
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
         slideFactory.createNewSlide("prarthana",response);
       },
        function(response) {
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
          slideFactory.createNewSlide("prarthana",response);
        },
         function(response) {
        }).finally(function() {
        });
    };

$scope.itemcollection=[
  {
    "wlname": "WatchlistONE",
    "charttype":"graph",
    "datatype":"data",
    "wldef":{
      "CountryName": "India",
      "CountryCode": "IND"
    },
    "value":[8, 3, 7],
    "size" : "30",
    "slideone":"B",
    "slidetwo":"A"
  },
  {
    "wlname": "WatchlistSECNOD",
    "charttype":"flow",
    "datatype":"rawdata",
    "wldef":
    {
      "CountryName": "Pakistan",
      "CountryCode": "PAK"
    },
    "value":[15, 30, 27],
    "size" : "50",
    "slideone":"B",
    "slidetwo":"A"
  },
  {	"wlname": "WatchlistTHIRD",
  "charttype":"flow",
  "datatype":"rawdata",
  "wldef":{
    "CountryName": "America",
    "CountryCode": "USA"
  },
  "value":[38, 13, 70],
  "size" : "70",
  "slideone":"A",
  "slidetwo":"B"
},
{"wlname": "WatchlistFOUR",
"charttype":"graph",
"datatype":"data",
"wldef":{
  "CountryName": "Britan",
  "CountryCode": "UK"
},
"value":[58, 32, 17],
"size" : "30",
"slideone":"B",
"slidetwo":"A"
},
{"wlname": "WatchlistFIVE",
"charttype":"graph",
"datatype":"data",
"wldef":{
  "CountryName": "Shrilanka",
  "CountryCode": "SK"
},
"value":[78, 12, 37],
"size" : "30",
"slideone":"A",
"slidetwo":"B"
},
{"wlname": "WatchlistSIX",
"charttype":"flow",
"datatype":"data",
"wldef":{
  "CountryName": "Japan",
  "CountryCode": "JP"
},
"value":[28, 32, 17],
"size" : "30",
"slideone":"B",
"slidetwo":"A"
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

$scope.watchlistdata=[{
  "namespace": "apatche",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": "Accumulate",
          "AccumulateOn": "Time",
          "AccumulateTill": "jhsai",
          "FunctionenPostAccumulation": "Sum",
          "FunctionenPostAccumulationParam": [
            "apatche"
          ],
          "exprAsText": "Accumulate(@Time(jhsai).then(Sum(apatche))"
        },
        "rfield": {
          "fieldType": "constant",
          "Constants": "e",
          "exprAsText": "Constant(e)"
        },
        "operator": "+"
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::2",
      "joinWith": "tag::3",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": []
    },
    "database": {
      "saveas": "watchlist1"
    },
    "outstream": {}
  },
  "name": "watchlist1",
  "description": "demowatchlist1"
},
{
  "namespace": "ngnix",
  "stream": "stream5",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": "Accumulate",
          "AccumulateOn": "Time",
          "AccumulateTill": "jhsai",
          "FunctionenPostAccumulation": "Sum",
          "FunctionenPostAccumulationParam": [
            "apatche"
          ],
          "exprAsText": "Accumulate(@Time(jhsai).then(Sum(apatche))"
        },
        "rfield": {
          "fieldType": "constant",
          "Constants": "e",
          "exprAsText": "Constant(e)"
        },
        "operator": "+"
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::2",
      "joinWith": "tag::3",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": []
    },
    "database": {
      "saveas": "watchlist1"
    },
    "outstream": {}
  },
  "name": "watchlist1",
  "description": "demowatchlist1"
},
{
  "namespace": "lighttpd",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
},
{
  "namespace": "apatche",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
},
{
  "namespace": "apatche",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::2",
      "joinWith": "tag::3",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
},
{
  "namespace": "apatche",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::2",
      "joinWith": "tag::3",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
},
{
  "namespace": "apatche",
  "stream": "stream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::2",
      "joinWith": "tag::3",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
},
{
  "namespace": "BOA",
  "stream": "inputstream1",
  "expressions": [
    {
      "tag": "Expression::1",
      "joinWith": "tag::2",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    },
    {
      "tag": "Expression::3",
      "joinWith": "",
      "joinBy": "",
      "inputStream": "",
      "watch": {
        "lfield": {
          "fieldType": ""
        },
        "rfield": {
          "fieldType": ""
        }
      },
      "outcomeForwarding": "All Data"
    }
  ],
  "publishers": {
    "dashboard": {
      "tabs": [
        "Log Format"
      ],
      "displaySize": "standard",
      "graphType": "line",
      "logFormat": "rawdata"
    },
    "database": {
      "saveas": "wathclist2"
    },
    "outstream": {}
  },
  "name": "wathclist2",
  "description": "demo"
}
]

}]);
