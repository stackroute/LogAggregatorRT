angular.module("tattva")
.service('loadExprData', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){

  this.getwatchlistdata=function(namespaceName){
    //console.log("In the get namespace factory method",namespaceName);
    var a=[];
    return $http.get('/watchlist/'+namespaceName).then(function(response) {
      data =  response.data;
      //console.log(data);
      for(i in data)
      {
        a.push(data[i].name);
      }
      //console.log(a);
      return a;
    });
  };
  // <!--Swagat loading the data for view/ edit watchlist-->
  this.getWatchlistData =function(wlName){
    //console.log("in the service for getting watchlist data");
    return $http.get('/watchlist/data/'+wlName).then(function(response){
      return response.data
    });
  };
  // <!--End-->
  this.getConstants=function(){
    return [{"Name":"Archimedes' constant π","Value":"3.14"},{"Name":"Ramanujan constant K","Value":"0.76"},{"Name":"Omega Constant Ω","Value":"0.567"},{"Name":"Euler's number e","Value":"2.74"},{"Name":"The golden ratio φ","Value":"1.618033988749894848204586"}]
  };

  this.getFunction=function(){
    return $http.get("/function");
  };

  this.getNameSpacenames=function(){
    //console.log("namespace \n requested");
    var z=namespaceFactory.getNameSpace().then(function(data){
      var z=[];
      for(i in data)
      {
        z.push(data[i].name);
      }
      return z;
    });
    return z;
  };

  this.getDataFields=function(namespaceName){
    var config = {
      params: {"name" : namespaceName }
    }
    return $http.get('/namespaces',config);
  };

  this.getNamespaceDetails= function(namespaceName){
    //console.log("In the get namespace factory method",namespaceName);
    return $http.get('/watchlist/'+namespaceName)
    .then(function(response) {
      data =  response.data;
      return data;
    });
  }

}]);
