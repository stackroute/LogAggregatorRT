angular.module('tattva')
.controller('designController',['$state','$scope', function($state,$scope){

	if($state.current.name == 'design.summary'){
		$scope.selectedIndex = 0;
	}
	else if($state.current.name == 'design.namespace'){
		$scope.selectedIndex = 1;
	}
	else if($state.current.name == 'design.instance'){
		$scope.selectedIndex = 2;
	}
	else if($state.current.name == 'design.streams'){
		$scope.selectedIndex = 3;
	}
	else if($state.current.name == 'design.historicQuery'){
		$scope.selectedIndex = 4;
	}
	else if($state.current.name == 'design.function'){
		$scope.selectedIndex = 5;
	}
	else if($state.current.name == 'design.constant'){
		$scope.selectedIndex = 6;
	}
	else if($state.current.name == 'design.watchlist'){
		$scope.selectedIndex = 7;
	}

}]);