angular.module('tattva')
.directive('userPanel', function() {
	return{
		restrict : 'E',
		template :'<md-button style="font-size: 22px;" ng-click="profilePanel($event)" class="md-fab md-raised md-mini">{{user.name[0]}}</md-button>',
		controller: function($scope,AuthService,$mdPanel){

			$this=this;
			$this._mdPanel = $mdPanel;
  //User Panel
  $scope.profilePanel = function() {
  	var position = $this._mdPanel.newPanelPosition()
  	.absolute()
  	.right('5px')
  	.top('68px');
  	
  	var config = {
  		animation: undefined,
  		attachTo: angular.element(document.body),
  		controller: ProfileCtrl,
  		controllerAs: 'ctrl',
  		templateUrl: '/home/template/userprofile.html',
  		panelClass: 'user-profile-design',
  		position: position,
  		zIndex: 150,
  		clickOutsideToClose: true,
  	};
  	
  	$this._mdPanel.open(config);
  };
  
  function ProfileCtrl(mdPanelRef,$scope,notificationFactory) {
  	$this._mdPanelRef = mdPanelRef;
  	
  	AuthService.getUserNavItem().then(function(response){
  		$scope.userNavItems = response;
  	});
  	
  	$scope.user = AuthService.getCurrentUser();
  }
  
  ProfileCtrl.prototype.closePanel = function() {
  	$this._mdPanelRef.close();
  };
}
}
});
