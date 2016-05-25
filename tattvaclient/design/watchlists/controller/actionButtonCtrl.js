angular.module('tattva')
.controller('actionButtonCtrl', function DemoCtrl($mdDialog) {
  var originatorEv;
  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
});
