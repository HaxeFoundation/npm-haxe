
var path = require('path');

var env = module.exports = {};

// clone local env
// FIXME: use object.assign ?
var local = process.env;
for( k in local ) {
	env[k] = local[k];
}

env['HAXELIB_PATH'] = path.join(__dirname, 'lib');
env['HAXE_STD_PATH'] = path.join(__dirname, 'current/std');
