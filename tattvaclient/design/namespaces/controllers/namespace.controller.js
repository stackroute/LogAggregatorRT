tattva.controller("createNamespaceCtrl",["$scope","$state","$http","$mdDialog","$document","$mdToast", "namespaceFactory",function($scope, $state, $http, $mdDialog,$mdToast, $document, namespaceFactory){
  $scope.nameSpace = {
    name:"",
    description:"",
    dataSchema: []
  };
  $scope.fieldType = "dimension";
  $scope.nameSpaceListdata=[];

  $scope.loadData=function()
  {
    $http.get('/nameSpaceList').then(function(response) {
      $scope.nameSpaceListdata = response.data;
    });
    // $scope.nameSpaceListdata = namespaceFactory.getNameSpace();
    // console.log('namespaceFactory.getNameSpace();=',namespaceFactory.getNameSpace());
    // console.log('$scope.nameSpaceListdata=',$scope.nameSpaceListdata);
  };
  $scope.delete = function(index){
    $scope.nameSpace.dataSchema.splice(index,1);
  }
  $scope.addDataFormat = function(){
    var newSchemaField = { 'fieldAlias': $scope.fieldAlias, 'fieldName': $scope.fieldName, 'fieldType': $scope.fieldType  };
    $scope.nameSpace.dataSchema.push(newSchemaField);
    $scope.fieldAlias = $scope.fieldName = $scope.fieldType = "";
    $scope.fieldType = "dimension";
  }
  $scope.createNamespaceSubmit = function(){
    // var toast = $mdToast.simple()
    // .textContent('Namespace ' + $scope.name+' is created!')
    // .action('OK')
    // .highlightAction(false)
    // .hideDelay(3000)
    // .position("bottom right");
    // $mdToast.show(toast).then(function(response) {
    //   $state.go("design.listNameSpace");
    // });

    if(!$scope.nameSpace.name){
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainerNamespace')))
        .clickOutsideToClose(true)
        .title('Create Namespace')
        .textContent('Please enter name of Namespace')
        .ariaLabel('Namespace name not defined')
        .ok('Got it!')
        // .targetEvent(ev)
      ).then(function(response){
        // $state.go("design.listNameSpace");
      });
      return;

    }

    else if(($scope.fieldAlias) && ($scope.fieldName) && ($scope.fieldType) ){
      console.log('default dataschema push');
      // var newSchemaField = { 'fieldAlias': $scope.fieldAlias, 'fieldName': $scope.fieldName, 'fieldType': $scope.fieldType  };
      $scope.nameSpace.dataSchema.push({ 'fieldAlias': $scope.fieldAlias, 'fieldName': $scope.fieldName, 'fieldType': $scope.fieldType  });
    }
    else if(!$scope.nameSpace.dataSchema.length){
      // var toast = $mdToast.simple()
      // .textContent('Please define Data Schema!')
      // .action('OK')
      // .highlightAction(false)
      // .hideDelay(2000)
      // .position("bottom right");
      // $mdToast.show(toast).then(function(response) {
      //   // $state.go("design.listNameSpace");
      //   // return;
      // });
      console.log("in elseif");
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainerNamespace')))
        .clickOutsideToClose(true)
        .title('Create Namespace')
        .textContent('Please define Data Schema')
        .ariaLabel('Data Schema not defined')
        .ok('Got it!')
        // .targetEvent(ev)
      ).then(function(response){
        // $state.go("design.listNameSpace");
      });
      return;
    }

    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainerNamespace')))
      .clickOutsideToClose(true)
      .title('Create Namespace')
      .textContent('Namespace '+  $scope.nameSpace.name+" is successfully created.")
      .ariaLabel('Namespace created successfully')
      .ok('Got it!')
      // .targetEvent(ev)
    ).then(function(response){
      $state.go("design.listNameSpace");
    });
    // $mdDialog.show({
    //   // controller: createNamespaceCtrl,
    //   templateUrl: 'design/namespaces/template/dialog.createNamespaceSuccess.html',
    //   parent: angular.element(document.body),
    //   // targetEvent: ev,
    //   clickOutsideToClose:true,
    //   // fullscreen: useFullScreen
    // })
    // .then(function(answer) {
    //   $scope.status = 'You said the information was "' + answer + '".';
    //   $state.go("design.listNameSpace");
    // }, function() {
    //   $scope.status = 'You cancelled the dialog.';
    // });

    var createNamespaceFormData = {'name':$scope.nameSpace.name, 'description':$scope.nameSpace.description, 'dataformat':$scope.nameSpace.dataSchema};
    // namespaceFactory.saveNameSpaceData(createNamespaceFormData);
    console.log(createNamespaceFormData);

  }
}]);

tattva.controller('editNamespaceCtrl',["$scope","$stateParams","$state",function($scope,$stateParams,$state){
  console.log("log 43",$stateParams.viewNamespaceData );
  console.log("log 43", typeof $stateParams.viewNamespaceData );
  $scope.editNameSpace =JSON.parse( $stateParams.viewNamespaceData );
  // $scope.editNameSpace = $stateParams.viewNamespaceData ;
  // console.log("from editNamespaceCtrl  - $scope.editNameSpace = ",$scope.editNameSpace);
  $scope.editNamespaceFlag=true;
  $scope.editNamespacetoggle = function(){
    $scope.editNamespaceFlag=false;
  };
  $scope.saveNamespace = function(){
    $state.go("design.listNameSpace");
  }
}]);
