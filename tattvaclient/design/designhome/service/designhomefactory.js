angular.module('tattva')
.factory('designhomeFactory',['$http',function($http){
  var summary={
    getdata : function(){
      // var result=[
      //   {name: "namespace" , value: 54},
      //   {name: "instance", value: 673},
      //   {name: "streams", value: 1489},
      //   {name: "avlwatchlist", value: 2831},
      //   {name: "actvwatchlist", value: 77},
      //   {name: "users", value: 337451}
      // ];
      // return result;
      // console.log("in factory");
      return $http.get('/appsummary/');
    }
  }
  return summary;
}]);
