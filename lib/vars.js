var fs = require('fs');
var path = require('path');
var packagePath = require('./path');

var downloadsPath = packagePath('downloads');
var haxeDir = path.join(downloadsPath, 'haxe');
var haxelibDir = path.join(downloadsPath, 'haxelib');
var haxelibSrcDir = path.join(haxelibDir, 'src');
var haxelibMain = 'UnknownHaxelibMain';

if (fs.existsSync(path.join(haxelibSrcDir, 'tools', 'haxelib', 'Main.hx'))) {
    haxelibMain = 'tools.haxelib.Main';
} else if (fs.existsSync(path.join(haxelibSrcDir, 'haxelib', 'client', 'Main.hx'))) {
    haxelibMain = 'haxelib.client.Main';
}

var vars = module.exports = {
    haxe : {
        dir: haxeDir,
        path: path.join(haxeDir, 'haxe')
    },
    haxelib : {
        dir: haxelibDir,
        path: path.join(haxeDir, 'haxe'),
        args: [
            '-cp', haxelibSrcDir,
            '--run', haxelibMain
        ]
    },
    env : {
        HAXELIB_PATH : packagePath('.haxelib'),
        HAXE_STD_PATH : path.join(haxeDir, 'std')
    }
}
