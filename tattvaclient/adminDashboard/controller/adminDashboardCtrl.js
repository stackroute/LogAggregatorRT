angular.module('tattva').controller("adminDashboardCtrl",['$scope','$http','$state',function($scope, $http,$state){
  var currentInstance=null;
  $scope.stats=null;
    // function getGraphdata() {
    // $http.get('./test12.json').
    // then(function(res){
    //   $scope.sunburstData = res.data;
    // },function(res){
    //   console.log("Error in getting graph data from server, error: ", res.data);
    // });
  // }
  $scope.sunburstData = {
    name:"tattva",
    instanceType : "superUser",
    orgSite:"tattva",
    level : 1,
    children:[
      {
        name:"org1",
        instanceType:"organization",
        level:2,
        orgSite:"org1",
        // logo:"http://www.thehindubusinessline.com/multimedia/dynamic/02440/wipro-digital_2440034f.jpg",
        children:[
          {
            name:"ns1",
            instanceType:"namespace",
            level:3,
            orgSite:"org1",
            children:[
              {
                name:"IS1",
                instanceType:"instance",
                level:4,
                orgSite:"org1",
                children:[
                  {
                    name:"s1",
                    instanceType:"stream",
                    level:5,
                    orgSite:"org1",
                    children:[
                      {
                        name:"w1",
                        instanceType:"watchlist",
                        orgSite:"org1",
                        level:6,
                        children:[]
                      },
                      {
                        name:"w2",
                        instanceType:"watchlist",
                        orgSite:"org1",
                        level:6,
                        children:[]
                      },{
                        name:"w3",
                        instanceType:"watchlist",
                        orgSite:"org1",
                        level:6,
                        children:[]
                      }
                    ]
                  },
                  {
                    name:"s2",
                    instanceType:"stream",
                    level:5,
                    orgSite:"org1",
                    children:[
                      {
                        name:"w1",
                        instanceType:"watchlist",
                        level:6,
                        children:[]
                      }
                    ]
                  }
                ]
              },
              {
                name:"IS2",
                instanceType:"instance",
                level:4,
                orgSite:"org1",
                children:[
                  {
                    name:"s1",
                    instanceType:"stream",
                    level:5,
                    orgSite:"org1",
                    children:[
                      {
                        name:"w1",
                        instanceType:"watchlist",
                        orgSite:"org1",
                        level:6,
                        // children:[]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name:"ns2",
            instanceType:"namespace",
            level:3,
            children:[
              {

                  name:"IS1",
                  instanceType:"instance",
                  level:4,
                  children:[
                    {
                      name:"s1",
                      instanceType:"stream",
                      level:5,
                      children:[
                        {
                          name:"w1",
                          instanceType:"watchlist",
                          level:6,
                          children:[]
                        }
                      ]
                    }
                  ]
                }

            ]
          },
        ]
      },
      {
        name:"org2",
        instanceType:"organization",
        level:2,
        orgSite:"org2",
        // logo:"http://symposium.adobe.com/images/deloitte-digital-logo.png"
        children:[
          {
            name:"ns3",
            instanceType:"namespace",
            orgSite:"org2",
            level:3,
            children:[
              {
                name:"is1",
                instanceType:"instance",
                level:4,
                orgSite:"org2",
                children:[
                  {
                    name:"s1",
                    instanceType:"stream",
                    level:5,
                    orgSite:"org2",
                    children:[
                      {
                        name:"w1",
                        instanceType:"watchlist",
                        orgSite:"org2",
                        level:6,
                        children:[]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  $scope.orgs = [
    {
      name:"wipro digital",
      address:"Electronic city,bangalore",
      logo:"http://www.thehindubusinessline.com/multimedia/dynamic/02440/wipro-digital_2440034f.jpg"
    },
    {
      name:"deloitte digital",
      address:"Gachibowli,Hyderbad",
      logo:"http://symposium.adobe.com/images/deloitte-digital-logo.png"
    }
  ];

  // console.log("from the parent controller scope:",$scope.sunburstData);
  // getGraphdata();
  var previousOrgSite;
  var selectionObj;
  $state.go('adminHome.appPortfolio');
  // var prms = {orgSite:""}
  // $scope.tattvaStats = {name:"tattva",instanceType:"superUser",level:1,children:3};
  $scope.tattvaStats={};
  stats = function(selectionObj){
    $scope.tattvaStats = selectionObj;
    if(!$scope.tattvaStats) {
      console.log("Transitioning to default sub state (orgportfolio)");
      $state.go('adminHome.appPortfolio');
    } else {
      prms = {orgSite: $scope.tattvaStats.orgSite};
      if(prms.orgSite!=previousOrgSite){
      console.log("changing state to orgwatches with params as ", prms);
      $state.go('adminHome.orgwatches', prms );
      previousOrgSite = prms.orgSite;
      }
    }
  };
}]);
