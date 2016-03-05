
var executable = require('./lib/executable');
var vars = require('./lib/vars');

module.exports = {
    haxe: executable( vars.haxe.path, vars.haxe.args ),
    haxelib: executable( vars.haxelib.path, vars.haxelib.args )
}

