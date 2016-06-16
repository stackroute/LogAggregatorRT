var tattva = angular.module('tattva');
tattva.factory('publisherSettingFactory',['$http', function($http){
  var uiPublisherFactory = {
    publisherFactoryMthd : function(publisherData){
      //console.log(publisherData);
      $http({
        method:'post',
        url:'/publisherData',
        data : publisherData
      }).then(function(response){
        return response.data;
        //console.log("Data");
      });
      return publisherData;
    }
  }
  return uiPublisherFactory;
}]);
