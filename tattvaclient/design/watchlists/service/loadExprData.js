angular.module("tattva")
.service('loadExprData', ['$http','namespaceFactory','streamService', function($http,namespaceFactory,streamService){


this.getConstants=function(){
return [{"Name":"PI","Value":"3.14"},{"Name":"e","Value":"2.74"},{"Name":"φ","Value":"1.618033988749894848204586"}]
}


this.getFunction=function(){
return $http.get("/function");
}


this.getNameSpacenames=function(){
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


this.getStreamname=function(selectednamespace){

var config = {
  params: {"namespace" : "name" }
}
}



this.getfieldOption=function(){
return $http.get('/fieldOption').then(function(response){
return response.data
});
}

this.getoperatorOption=function(){
  return $http.get('/operatorOption');
}




this.getDataFields=function(namespaceName){
    var config = {
      params: {"name" : namespaceName }
    }
 return $http.get('/namespaces',config);
}


this.getOutcomeOptions=function(){
return $http.get('/OutcomeOptions').then(function(response){
return response.data;
});
}


      this.getNamespaceDetails= function(namespaceName){
        console.log("In the get namespace factory method",namespaceName);
         return $http.get('/watchlist/'+namespaceName)
         .then(function(response) {
           data =  response.data;
            // console.log(data);
           return data;
         });
      }

}]);
