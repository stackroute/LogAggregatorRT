angular.module("tattva")
.service('loadExprData', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){


this.getConstants=function(){
return [{"Name":"PI","Value":"3.14"},{"Name":"e","Value":"2.74"},{"Name":"φ","Value":"1.618033988749894848204586"}]
}


this.getFunction=function(){
return $http.get("/function")
}


this.getNameSpacenames=function(){
return namespaceFactory.getNameSpace().then(function(data){
    var namespacename=[];
    for(i in data)
    {
      namespacename.push(data[i].name)
    }
    return namespacename
    ;}
  );
}


this.getStreamname=function(){
  return streamService.getData()
  .then(function(response)
  {
    var data=response.data;return data})
    .then(function(data){
      var streamname=[];
      for(i in data)
      {
        streamname.push(data[i].streamname)
      }
      return streamname
      ;})
}

this.getfieldOption=function(){
return $http.get('/fieldOption').then(function(response){
return response.data
});
}

this.getoperatorOption=function(){
  return $http.get('/operatorOption').then(function(response){
    return response.data
});
}


this.getDataFields=function(namespaceName){
    var config = {
      params: {"name" : namespaceName }
    }
 return $http.get('/namespace',config);
}
}]);
