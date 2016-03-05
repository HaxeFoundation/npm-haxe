
var executable = require('./executable');
var vars = require('./vars');

module.exports = {
    haxe: executable( vars.haxe.path, vars.haxe.args ),
    haxelib: executable( vars.haxelib.path, vars.haxelib.args )
}

