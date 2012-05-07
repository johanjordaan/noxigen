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
    it('should generate a meta model with 1 module and 0 classes', function(done) {
      var meta_model = noxigen.build_meta_model(require('./test_data/1module_0classes/settings'));
      var modules = meta_model.modules;
      modules.module_names.length.should.equal(1);
      modules.module_names[0].should.equal('m1');
      modules.m1.class_names.length.should.equal(0);
      modules.m1.__name__.should.equal('m1');
      
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
      modules.m1.c1.__name__.should.equal('c1');
      modules.m1.c2.__name__.should.equal('c2');
            
      var classes = meta_model.classes;
      classes.class_names.length.should.equal(2);
      classes.class_names[0].should.equal('c1');
      classes.class_names[1].should.equal('c2');
      
      done();
    })
  })

  describe('2 module and 5 empty classes ', function() {
    it('should generate a meta model with 2 modules one with 2 classes and one with 3 classes', function(done) {
      var meta_model = noxigen.build_meta_model(require('./test_data/2modules_5classes/settings'));
     
      var modules = meta_model.modules;
      modules.module_names.length.should.equal(2);
      modules.module_names[0].should.equal('m1');
      modules.module_names[1].should.equal('m2');
      // m1
      modules.m1.class_names.length.should.equal(2);
      modules.m1.class_names[0].should.equal('c1');
      modules.m1.class_names[1].should.equal('c2');
      modules.m1.c1.__name__.should.equal('c1');
      modules.m1.c2.__name__.should.equal('c2');
      // m2
      modules.m2.class_names.length.should.equal(3);
      modules.m2.class_names[0].should.equal('c3');
      modules.m2.class_names[1].should.equal('c4');
      modules.m2.class_names[2].should.equal('c5');
      modules.m2.c3.__name__.should.equal('c3');
      modules.m2.c4.__name__.should.equal('c4');
      modules.m2.c5.__name__.should.equal('c5');
            
      var classes = meta_model.classes;
      classes.class_names.length.should.equal(5);
      classes.class_names[0].should.equal('c1');
      classes.class_names[1].should.equal('c2');
      classes.class_names[2].should.equal('c3');
      classes.class_names[3].should.equal('c4');
      classes.class_names[4].should.equal('c5');
      classes.c1.__name__.should.equal('c1');
      classes.c2.__name__.should.equal('c2');
      classes.c3.__name__.should.equal('c3');
      classes.c4.__name__.should.equal('c4');
      classes.c5.__name__.should.equal('c5');
      
      done();
    })
  })
});