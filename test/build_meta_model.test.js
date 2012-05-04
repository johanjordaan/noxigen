var fs = require('fs');
var should = require('chai').should();

var noxigen = require('../noxigen');

describe('build_meta_model', function() {
  describe('0 modules', function() {
    it('should generate a meta model with 0 module and 0 classes', function(done) {
      var meta_model = noxigen.build_meta_model(require('./test_data/0modules/settings'));
     
      var modules = meta_model.modules;
      modules.module_names.length.should.equal(0);
      
      var classes = meta_model.classes;
      classes.class_names.length.should.equal(0);
      
      done();
    })
  })

  describe('1 modules 0 classes', function() {
    it('should generate a meta model with 0 module and 0 classes', function(done) {
      var meta_model = noxigen.build_meta_model(require('./test_data/1module_0classes/settings'));
     
      var modules = meta_model.modules;
      modules.module_names.length.should.equal(1);
      modules.module_names[0].should.equal('m1');
      modules.m1.class_names.length.should.equal(0);
      
      var classes = meta_model.classes;
      classes.class_names.length.should.equal(0);
      
      done();
    })
  })
  
  describe('1 module and 2 empty classes ', function() {
    it('should generate a meta model with 1 module and 2 classes in this module', function(done) {
      var meta_model = noxigen.build_meta_model(require('./test_data/1module_2classes/settings'));
     
      var modules = meta_model.modules;
      modules.module_names.length.should.equal(1);
      modules.module_names[0].should.equal('m1');
      modules.m1.class_names.length.should.equal(2);
      modules.m1.class_names[0].should.equal('c1');
      modules.m1.class_names[1].should.equal('c2');
      
      var classes = meta_model.classes;
      classes.class_names.length.should.equal(2);
      classes.class_names[0].should.equal('c1');
      classes.class_names[1].should.equal('c2');
      
      done();
    })
  })

  
  
});