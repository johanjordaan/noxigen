#!/usr/bin/env node

fs = require('fs');
path = require('path');
ejs = require('ejs');

IntField = function() {
  this._type = 'IntField'
}
TextField = function(len) {
  this._type = 'TextField';
  this.len = len;
}
ArrayField = function(type) {
  this._type = 'ArrayField';
  this.type = type;
}

render = function(template,params,destination) {
  if(!path.existsSync(template))
    abort(template+' does not exist');
  var t = fs.readFileSync(template,'utf8');
  var tr = ejs.render(t,params);  
  fs.writeFileSync(destination,tr);
}

exports.abort = abort = function(str) {
  console.error(str);
  process.exit(1);
}

///////////////////////////////////
exports.validate_settings = validate_settings = function(settings) {
  if(typeof(settings.modules) == 'undefined') 
    throw 'no variable [modules] defined in settings file';
  if(settings.modules instanceof Array)
    throw 'variable [modules] should not be of type Array';
  if(typeof(settings.modules) != 'object')
    throw 'variable [modules] should be of type '+typeof({});
}

exports.build_meta_model = build_meta_model = function(settings) {

  // Create the top level return values
  //
  var module_groups = {}
  var modules = {}
  var classes = {}
  classes.class_names = []
  
  // Extract all the modules from the settings and add them and their names to the 
  // return structures
  //
  var module_names = modules.module_names = Object.keys(settings.modules);
  for(var mni=0;mni<module_names.length;mni++){
    var module_name = modules.module_names[mni];
    var settings_module = settings.modules[module_name];
    modules[module_name]= {};
    modules[module_name].__name__= module_name;
    
    // Start processing all classes in the current module.
    //
    var class_names = modules[module_name].class_names = Object.keys(settings_module);
    classes.class_names = classes.class_names.concat(class_names);  // Add the global classes
    for(var cni=0;cni<class_names.length;cni++) {
      var class_name = class_names[cni];
      var c = new settings_module[class_name]();
      modules[module_name][class_name] = c;
      classes[class_name] = c;
      classes[class_name].__name__ = class_name;
    }
  }
  
  return {modules:modules,classes:classes};
} 

exports.generate_templates = generate_templates = function(meta_model,settings,templates) {
  // Render the main templates
  //
  for(var ti=0;ti<templates.main_templates.length;ti++) {
    var template = templates.main_templates[ti];
    var parms = {settings:settings,meta_model:meta_model};
    render(templates.base_path+'/'+template.template,parms,ejs.render(template.destination,parms));
  }
  
  // Render the modules templates
  //
  for(var mni=0;mni<meta_model.modules.module_names.length;mni++) {
    var module_name = meta_model.modules.module_names[mni];
    console.log(module_name);
    for(var ti=0;ti<templates.module_templates.length;ti++) {
      var template = templates.module_templates[ti];
      var module = meta_model.modules[module_name];
      var parms = {settings:settings,meta_model:meta_model,module_name:module_name};
      render(templates.base_path+'/'+template.template,parms,ejs.render(template.destination,parms));
    }
  }

  // Render the class templates
  //
  for(var cni=0;cni<meta_model.classes.class_names.length;cni++) {
    var class_name = meta_model.classes.class_names[cni];
    console.log(class_name);
    for(var ti=0;ti<templates.class_templates.length;ti++) {
      var template = templates.class_templates[ti];
      var parms = {settings:settings,meta_model:meta_model,class_name:class_name};
      render(templates.base_path+'/'+template.template,parms,ejs.render(template.destination,parms));
    }
  }
}
