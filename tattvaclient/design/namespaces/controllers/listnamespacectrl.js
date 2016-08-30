angular.module('tattva')
.controller('listNamespaceCtrl',['$scope','$mdDialog','namespaceFactory','nameSpaceColln','$filter',
  function($scope, $mdDialog, namespaceFactory, nameSpaceColln,$filter/*pageController*/) {
$scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.nameSpaceListdata = [];
    $scope.q = '';
  $scope.tabTitle ="Namespaces";
  $scope.stateChange="design.createNamespace";

  $scope.nameSpaceListdata = nameSpaceColln;
<<<<<<< HEAD
  console.log( "namespace list ", $scope.nameSpaceListdata);
  console.log($scope.nameSpaceListdata.length);
=======
  
>>>>>>> 1867e833678885851e1c23d6d995ae58fe0e7eb7

  $scope.showSearchBox = function(){
    if($scope.showSearch){
      $scope.showSearch= false;
    }
    else{
      $scope.showSearch = true;
    }
  }

  $scope.showNamespacePreview = function() {
    console.log("Show preview from here");

    $mdDialog.show({

      templateUrl: "design/namespaces/template/createNamespacedialog.html",
       controller:"createNamespaceCtrl"



    });
  }
 $scope.getData = function () {
      // needed for the pagination calc
     
      console.log($filter('filter')($scope.nameSpaceListdata, $scope.q));
            return $filter('filter')($scope.nameSpaceListdata, $scope.q)
     
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
   /* for (var i=0; i<21; i++) {
        $scope.nameSpaceListdata.push("nameSpaceListdata");
    }*/
}])

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter

.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


  /*$scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.nameSpaceListdata = [];
    $scope.q = '';
    
    $scope.getData = function () {
      // needed for the pagination calc
      // https://docs.angularjs.org/api/ng/filter/filter
      return $filter('filter')($scope.nameSpaceListdata, $scope.q)
    
    }
    
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
    }
    
    for (var i=0; i<65; i++) {
        $scope.nameSpaceListdata.push("Item "+i);
    }


//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
angular.module('tattva').filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
*/
/*function pageController(PagerService) {
        var vm = this;

        vm.dummyItems = _.range(1, 151); // dummy array of items to be paged
        vm.pager = {};
        vm.setPage = setPage;

        initController();

        function initController() {
            // initialize to page 1
            vm.setPage(1);
        }

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = PagerService.GetPager(vm.dummyItems.length, page);

            // get current page of items
            vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
    }

    function PagerService() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }
}()*/
