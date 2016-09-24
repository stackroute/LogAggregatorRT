angular.module('tattva')
.directive('notifyPanel', function() {
	return{
		restrict : 'E',
		template :'<md-button ng-click="showPanel($event)" class="md-fab md-raised md-mini" ng-class="{\'md-warn\':notifyindicator}"><md-icon class="material-icons">notifications</md-icon><span ng-if="count>0">{{count}}</span></md-button>',
		controller: function($rootScope,$scope,AuthService,$mdPanel){

			$this=this;
			$this._mdPanel = $mdPanel;
  //notification  
  $scope.showPanel = function() {
  	var position = $this._mdPanel.newPanelPosition()
  	.absolute()
  	.right('5px')
  	.top('68px');
  	$rootScope.count=0;
    console.log($rootScope.count);
  	var config = {
  		animation: undefined,
  		attachTo: angular.element(document.body),
  		controller: PanelCtrl,
  		controllerAs: 'ctrl',
  		templateUrl: '/home/template/notificationbar.html',
  		panelClass: 'design-dialog',
  		position: position,
  		zIndex: 150,
  		clickOutsideToClose: true,
  	};
  	
  	$this._mdPanel.open(config);
  };
  
  function PanelCtrl(mdPanelRef,$scope,$rootScope) {
    $scope.notify = $rootScope.notify;
    if($rootScope.count == 0)
      {
        $rootScope.notifyindicator=false;
      }
    $scope.notifyindicator=$rootScope.notifyindicator;
    $scope.count = $rootScope.count;
  	
  	AuthService.getUserNavItem().then(function(response){
  		$scope.userNavItems = response;
  	});
  	
  	$this._mdPanelRef = mdPanelRef;
  }
  
  PanelCtrl.prototype.closePanel = function() {
  	$this._mdPanelRef.close();
  };
}
}
});
