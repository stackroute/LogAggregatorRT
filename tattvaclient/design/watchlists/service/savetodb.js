angular.module("tattva")
.service('saveToDB', ['$http','$q',function($http,$q){
  this.savewatchloopdata=function(watchlistData1){
    //console.log(watchlistData1);
    var watchloopdata={watchname:watchlistData1.name,execstatus:"active",execstartedon:"",execstoppedon:"",watcherrors:""};
    $http({
      method : 'post',
      url : '/watchloop',
      data : watchloopdata
    }).then(function(response)
    {
      if (response.data.errors) {
        // Showing errors.
        $scope.errorName = response.data.errors.name;
      } else {
        $scope.message = response.data.message;
      }
    },function(err){
    });
  };

this.savewatchloopeditdata=function(watchlistData1){
    $http({
      method : 'put',
      url : '/watchloop',
      data : watchlistData1
    }).then(function(response)
    {
    },function(err){
      //console.log(err);
    });
  };

  this.editwatchloopdata=function(watchlistData1){
    var watchlistData=watchlistData1;
    //console.log("editwatchlistData = ", watchlistData);
    $http({
      method : 'put',
      url : '/watchloop/'+watchlistData.name,
      data : watchlistData
    }).then(function(response)
    {
      //console.log(response);
      if (response.data.errors) {
        // Showing errors.
        //console.log(response.data.errors);
        // $scope.errorName = response.data.errors.name;
      }
      response.send("Data Saved successfully");
    });
  };



  this.savewatchlistdata=function(watchlistData1){
    var watchlistData=watchlistData1;
    console.log("watchlistData =", watchlistData);
    // $http({
    //   method : 'post',
    //   url : '/watchlist',
    //   data : watchlistData
    // }).then(function(response)
    // {
    //   if (response.data.errors) {
    //     // Showing errors.
    //     $scope.errorName = response.data.errors.name;
    //   } else {
    //     $scope.message = response.data.message;
    //   }
    // },function(err){
    //   //console.log(err);
    // });
    //
    return $q(function(resolve, reject) {
      $http.post('/watchlist', watchlistData)
      .then(function(res) {
        //success
            console.log("save to db success");
          resolve(res.data);
      },
      function(res) {
        //error
        reject(res.data);
      }
    );
  })
  };

  this.editwatchlistdata=function(watchlistData1){
    var watchlistData=watchlistData1;
    //console.log("editwatchlistData = ", watchlistData);
    // $http({
    //   method : 'put',
    //   url : '/watchlist/'+watchlistData.name,
    //   data : watchlistData
    // }).then(function(response)
    // {
    //   //console.log(response);
    //   if (response.data.errors) {
    //     //console.log(response.data.errors);
    //   }
    // },function(err)
    // {
    //   //console.log(err);
    // });

    return $q(function(resolve, reject) {
      $http.put('/watchlist/'+watchlistData.name, watchlistData)
      .then(function(res) {
        //success
            console.log("save to db success");
          resolve(res.data);
      },
      function(res) {
        //error
        reject(res.data);
      }
    );
  })


  };


  this.getwatchlistdata=function()
  {
    $http.get('/watchlistdata',function() {
    });
  };
}]);
