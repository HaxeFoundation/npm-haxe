
var executable = require('./lib/executable');
var vars = require('./lib/vars');

module.exports = {
    haxe: executable( vars.haxe.path, vars.haxe.args ),
    haxelib: executable( vars.haxelib_interp.path, vars.haxelib_interp.args ),
    haxelib_bin: executable( vars.haxelib_bin.path, vars.haxelib_bin.args )
}

