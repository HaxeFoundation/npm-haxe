
var path = require('path');

function configPath( id ) {
	var p = process.env['npm_package_config_' + id];
	console.log('config path', id, p);
	return path.join(__dirname, p);
}

module.exports = {
	'HAXELIB_PATH': configPath('haxelib_path'),
	'HAXE_STD_PATH': configPath('std_path')
}