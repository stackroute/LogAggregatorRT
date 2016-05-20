var tattva = angular.module('tattva');
tattva.factory('publisherSettingFactory',['$http', function($http){
  var uiPublisherFactory = {
    publisherFactoryMthd : function(publisherData){
      console.log(publisherData);
      $http({
        method:'post',
        url:'/publisherData',
        data : publisherData
      }).then(function(response){
        return response.data;
        console.log("Data");
      });
      return publisherData;
    }
  }
  return uiPublisherFactory;
}]);

tattva.factory('dialoguefordemofactory',['$mdDialog',function ($mdDialog) {
  return function(dialoguefordemoobject)
  {
    var confirm=$mdDialog.show({
      template: '<md-dialog>' + '  <md-dialog-content>'+'<input type="text" value="dialoguefordemoobject.name"> </md-dialogue>' ,
      parent: angular.element(document.body),
      clickOutsideToClose: true
    });
  }
}]);
