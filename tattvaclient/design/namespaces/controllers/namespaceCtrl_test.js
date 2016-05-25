describe('calculator', function () {
  beforeEach(angular.mock.module('app'));
  var $controller;
  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  describe('name check',function() {
    it('should check the name', function() {
      var $scope = {};
      var controller =  $controller('sampleController',{$scope:$scope});
      // expect($scope.name).toBe('foo');
    });
  });
});
