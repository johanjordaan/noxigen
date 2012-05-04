var fs = require('fs');
var should = require('chai').should();

var noxigen = require('../noxigen');

describe('validate_settings', function() {
  it('should detect an empty settings file', function(done) {
    (function() {
      noxigen.validate_settings({});
    }).should.throw('no variable [modules] defined in settings file');
    done();
  })
  
  it('should detect a modules variable with the wrong type', function(done) {
    (function() {
      noxigen.validate_settings({modules:''});
    }).should.throw('variable [modules] should be of type '+typeof({}));
    (function() {
      noxigen.validate_settings({modules:3});
    }).should.throw('variable [modules] should be of type '+typeof({}));
    (function() {
      noxigen.validate_settings({modules:[]});
    }).should.throw('variable [modules] should not be of type Array');
    done();
  })

});