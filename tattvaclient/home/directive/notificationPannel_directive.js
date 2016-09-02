angular.module('tattva')
.directive('notifyPanel', function() {
	return{
		restrict : 'E',
		template :'<md-button ng-click="showPanel($event)" class="md-fab md-mini md-primary"><md-icon class="material-icons">{{userNavItems.sideNav[4].icon}}</md-icon></md-button>',
		controller: function($scope,AuthService,$mdPanel){

			$this=this;
			$this._mdPanel = $mdPanel;
  //notification  
  $scope.showPanel = function() {
  	var position = $this._mdPanel.newPanelPosition()
  	.absolute()
  	.right('5px')
  	.top('68px');
  	
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
  
  function PanelCtrl(mdPanelRef,$scope,notificationFactory) {
  	notificationFactory.getNotificationItems().then(function(res){
  		$scope.notify = res;
  	},
  	
  	function(res){
  		$scope.notifyerror = res;
  	});
  	
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
