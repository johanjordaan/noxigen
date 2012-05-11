#!/usr/bin/env node

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory(path, fn) {
  fs.readdir(path, function(err, files){
    if (err && 'ENOENT' != err.code) throw err;
    fn(!files || !files.length);
  });
}


// Import all the required modules
//
var path = require('path');
var fs = require('fs');
var noxigen = require('../noxigen');
var program = require('commander');
var pkg = require('../package.json');
var ejs = require('ejs');
var os = require('os');

var version = pkg.version;
var eol = 'win32' == os.platform() ? '\r\n' : '\n'

// Commands
//
var settings_template = [
   '// Generated settings'
  ,'//'
  ,''  
  ,'module.exports = {'
  ,'  modules : {'
  ,'  },'
  ,'  templates : ['
  ,'  ]'
  ,'}'
].join(eol);

var modules_template = [
  ,'module.exports = {'
  ,'  noxigen_modules : {'
  ,'    <% var module_keys = Object.keys(modules) -%>'
  ,'    <% for(var i=0;i<module_keys.length;i++) { -%>'
  ,'    <%= module_keys[i] %> : \'<%= modules[module_keys[i]]%>\','
  ,'    <% } -%>'
  ,'  },'
  ,'}'
].join(eol);

var module_template = [
  ,'var <%= module_name %> = module.exports = {'
  ,'}'
].join(eol);


start_project = function(project_name) {
  var project_path = path.join('.',project_name);
  path.exists(project_path,function(exists) {
    if(exists) throw '['+project_name+'] already exists';
    fs.mkdirSync(project_path);
    fs.writeFileSync(path.join(project_path,'settings.js'),ejs.render(settings_template,{}));
    var noxigen_path = path.join(project_path,'.noxigen');
    fs.mkdirSync(noxigen_path);
    fs.mkdirSync(path.join(project_path,'modules'));
  });  
}

// Todo : Add check for already existing modules
add_module = function(module_name,location) {
  if(typeof(location) == 'undefined')
    location = path.join(process.env.PWD,'modules');
  var noxigen_path = path.join(process.env.PWD,'.noxigen');
  path.exists(noxigen_path,function(exists) {
    if(!exists) throw 'This is not a noxigen project';
    var noxigen_modules_fn = path.join(noxigen_path,'modules.js'); 
    path.exists(noxigen_modules_fn,function(exists) {
      
      // Update the modules file
      //
      var m = { noxigen_modules : {} };
      if(exists) m = require(noxigen_modules_fn);
      m.noxigen_modules[module_name] = 'modules/'+module_name+'.js'
      fs.writeFileSync(path.join('.noxigen','modules.js'),ejs.render(modules_template,{modules:m.noxigen_modules}));
      
      // Create the module if it doen not already exist
      //
      path.exists(path.join(location,module_name),function(exists) {
        if(exists) return;
        fs.writeFileSync(path.join(location,module_name+'.js'),ejs.render(module_template,{module_name:module_name}));
      });    
      
    });
  });
}

remove_module = function(module_name,force_delete) {
  console.log('Removing --',module_name,'with',force_delete);
}

generate_project = function() {
  var p = path.join(process.env.PWD,'settings');
  console.log(p);
  var settings = require(p);
  var templates = require('../templates/debug/');
  templates.base_path = path.resolve(__dirname,'../templates/debug');
  templates.dest_path = process.env.PWD;
  noxigen.validate_settings(settings);
  var meta_model = noxigen.build_meta_model(settings);
  noxigen.generate_templates(meta_model,settings,templates);  
}



// Setup the command line
//
program
  .usage('[options] <settings>')
  .version(version)

program
  .command('startproject <project_name>')
  .description(' starts a new noxigen project')
  .action(start_project);

program
  .command('addmodule <module_name> [location]')
  .description(' add a new module to the project')
  .action(add_module);

program
  .command('removemodule <module_name>')
  .description(' removes a module from the project')
  .action(add_module);
  
  
program
  .command('generate')
  .description(' generate the project')
  .action(generate_project);

program.parse(process.argv);
