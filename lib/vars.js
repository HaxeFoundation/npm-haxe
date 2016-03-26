var path = require('path');
var packagePath = require('./path');

var downloadsPath = packagePath('downloads');
var haxeDir = path.join(downloadsPath, 'haxe');
var haxelibDir = path.join(downloadsPath, 'haxelib');

var vars = module.exports = {
    haxe : {
        dir: haxeDir,
        path: path.join(haxeDir, 'haxe')
    },
    haxelib : {
        dir: haxelibDir,
        path: path.join(haxeDir, 'haxe'),
        args: [
            '-cp', path.join(haxelibDir, 'src'),
            '--run', 'tools.haxelib.Main'
        ]
    },
    env : {
        HAXELIB_PATH : packagePath('.haxelib'),
        HAXE_STD_PATH : path.join(haxeDir, 'std')
    }
}