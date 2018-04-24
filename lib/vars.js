var path = require('path');
var packagePath = require('./path');

var downloadsPath = packagePath('downloads');
var haxeDir = path.join(downloadsPath, 'haxe');
var haxelibDir = path.join(downloadsPath, 'haxelib');
var nekoDir = path.join(downloadsPath, 'neko');

var vars = module.exports = {
    haxe : {
        dir: haxeDir,
        path: path.join(haxeDir, 'haxe')
    },
    neko : {
            dir: nekoDir,
            path: path.join(nekoDir, 'neko')
        },
    haxelib : {
        dir: haxelibDir,
        path: path.join(nekoDir, 'neko'),
        args: [
            path.join(haxelibDir, 'run.n')
        ]
    },
    env : {
        HAXELIB_PATH : packagePath('.haxelib'),
        HAXE_STD_PATH : path.join(haxeDir, 'std')
    }
}
