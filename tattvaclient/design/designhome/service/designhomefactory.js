angular.module('tattva')
.factory('designhomeFactory',function(){
  var summery={
    getdata : function(){
      var result=[
        {name: "namespace" , value: 54},
        {name: "instance", value: 673},
        {name: "streams", value: 1489},
        {name: "avlwatchlist", value: 2831},
        {name: "actvwatchlist", value: 77},
        {name: "users", value: 337451}
      ];
      return result;
    }
  }
  return summery;
});
