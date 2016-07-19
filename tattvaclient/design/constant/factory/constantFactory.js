angular.module('tattva')
.factory('constantFactory', ['$http','$q', function($http,$q){
var factory = {
    loadconstantlist: function() {
      return $q(function(resolve, reject) {
        $http.get('/constant')
        .then(function(res){
          resolve( res.data);
        },
        function(res) {
          reject(res.data);
        });
      });
    },
    savedata:function(newconstant){
      return $q(function(resolve, reject){
        $http.post('/constant/addconstant', newconstant)
        .then(function(res){
          resolve(res.data);
        },
        function(res) {
          //error
          reject(res.data);
        });
    });
  }
}//end of factory definition
return factory;
}]);
