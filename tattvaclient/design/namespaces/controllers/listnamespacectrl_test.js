var assert = require('chai').assert;
var control = require("");

describe('Controller:listNamespaceCtrl', function(){
  beforeEach(module('tattva'));
  var ctrl;

  beforeEach(inject(function($conroller){
    ctrl = $controller('listNamespaceCtrl')
  }));



  it('getSubtotal() should return 0 if no items are passed in', function() {
    var teaOrder = 'chai';
  assert.isString(teaOrder, 'order placed')
  });

});
