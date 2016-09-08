var count=0;

angular.module('tattva')
.factory('notificationFactory', ['$http','$q', function($http,$q){
  var factory = {
    getNotificationItems : function() {
  
      var start=0,end=5;
      if(count==1)
      {
        start=start+5;
        end=end+5 ;
      }
      count++;
      //Returning a promise object
      return $q(function(resolve, reject) {
        $http.get('http://localhost:8081/notifications?_start='+start+'&_end='+end)
        .then(function(res) {
           data =  res.data;
    //    console.log(data);
      resolve(data); 
    },function(res) {
      //error
      reject("No New Notification to show...! ");
    });
    });
  }
  }//end of factory definition
  return factory;
}]);