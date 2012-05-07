#!/usr/bin/env node

// Import all the required modules
//
var path = require('path');
var noxigen = require('../noxigen');
var program = require('commander');
var pkg = require('../package.json');
var version = pkg.version;

// Setup the command line
//
program
  .usage('[options] <settings>')
  .version(version)
  .option('-t, --target <n>','The target to generate for.')
  .parse(process.argv);
  
// Extract the command line arguments and validate
//  
var settings_file_fqp = path.resolve(program.args.shift() || '.');  
if(!path.existsSync(settings_file_fqp)) {
  console.log('Settings file ['+settings_file_fqp+'] does not exist');
  process.exit(1);
}

// Run the generator
//
try {
  var settings = require(settings_file_fqp);
  var templates = require('../templates/'+program.target);
  noxigen.validate_settings(settings);
  var meta_model = noxigen.build_meta_model(settings);
  noxigen.generate_templates(meta_model,settings,templates);  
} catch(err) {
  console.log(err);
}
