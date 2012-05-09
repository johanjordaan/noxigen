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

var eol = 'win32' == os.platform() ? '\r\n' : '\n'

// Commands
//
var version = pkg.version;
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

start_project = function(project_name) {
  var p = path.join('.',project_name);
  path.exists(p,function(exists) {
    if(exists) {
      console.log('[%s] already exists',project_name);
    } else {
      fs.mkdirSync(p);
      fs.writeFileSync(path.join(p,'settings.js'),ejs.render(settings_template,{}));
    }
  });  
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
  .option('-t, --target <n>','The target to generate for.')

program
  .command('startproject <project_name>')
  .description(' starts a new noxigen project')
  .action(start_project);
  
program
  .command('generate')
  .description(' generate the project')
  .action(generate_project);

program.parse(process.argv);


// Extract the command line arguments and validate
//  
//var settings_file_fqp = path.resolve(program.args.shift() || '.');  
//if(!path.existsSync(settings_file_fqp)) {
//  console.log('Settings file ['+settings_file_fqp+'] does not exist');
//  process.exit(1);
//}


// Run the generator
//
//try {
//  var settings = require(settings_file_fqp);
//  var templates = require('../templates/'+program.target);
//  templates.base_path = path.resolve(__dirname,'../templates',program.target);
//  noxigen.validate_settings(settings);
//  var meta_model = noxigen.build_meta_model(settings);
//  noxigen.generate_templates(meta_model,settings,templates);  
//} catch(err) {
//  console.log(err);
//}
