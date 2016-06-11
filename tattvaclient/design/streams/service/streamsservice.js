angular.module('tattva')
.service('namespaceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewNamespace');
  }
}]);

angular.module('tattva')
.service('instanceService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewInstance')
  }
}]);

angular.module('tattva')
.service('streamService',['$http',function($http){
  this.getData=function(){
    return $http.get('/viewStreams')
  }
}]);
angular.module('tattva')
.service('streamsservice',['$http',function($http){
  this.saveStream=function(streamsData){
    $http({
      method : 'post',
      url : '/datastream',
      data : streamsData
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

  this.saveEditedStream=function(streamsData){
console.log("streamsData = = = ",streamsData);
    $http({
      method : 'put',
      url : '/datastream',
      data : streamsData
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
}]);
