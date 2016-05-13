angular.module('tattva')
.controller('dashboardcontroller', ['$scope','$state',
function($scope,$state) {
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
