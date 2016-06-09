angular.module("tattva")
.service('saveToDB', ['$http',function($http){
  this.savewatchlistdata=function(watchlistData1){
    var watchlistData=watchlistData1;
    console.log("watchlistData = ", watchlistData);
    $http({
      method : 'post',
      url : '/watchlist',
      data : watchlistData
    }).then(function(response)
    {
      if (response.data.errors) {
        // Showing errors.
        $scope.errorName = response.data.errors.name;
      } else {
        $scope.message = response.data.message;
      }
    });
  };

  this.editwatchlistdata=function(watchlistData1){
    var watchlistData=watchlistData1;
    console.log("editwatchlistData = ", watchlistData);
    $http({
      method : 'put',
      url : '/watchlist/'+watchlistData.name,
      data : watchlistData
    }).then(function(response)
    {
      console.log(response);
      if (response.data.errors) {
        // Showing errors.
        console.log(response.data.errors);
        // $scope.errorName = response.data.errors.name;
      }
      response.send("Data Saved successfully");
    });
  };

  this.getwatchlistdata=function()
  {
    $http.get('/watchlistdata',function()
    {
    });
  };

  // this.savewatchexecutor=function(watchexecutorData){
  // var time=Date.now();
  // var status="active";
  // var watches= [
  //     {
  //       "watchid": watchexecutorData._id,
  //       "watchname":watchexecutorData.name,
  //       "status":status,
  //       "execstartedon":time,
  //       "execstoppedon":{type: String},
  //       "errors":[
  //         "timestamp":,
  //         "error":{type:String}
  //                 ]
  //             }
  //               ]
  // $http({
  //   method : 'post',
  //   url : '/watchlist',
  //   data : watchlistData
  //   }).then(function(response)
  //         {
  //           if (response.data.errors) {
  //             // Showing errors.
  //             $scope.errorName = response.data.errors.name;
  //           } else {
  //             $scope.message = response.data.message;
  //           }
  //         });
  //   };

}]);
