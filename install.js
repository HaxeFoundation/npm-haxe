#!/usr/bin/env node
var os = require('os');
var fsx = require('fs-extra');
var fs = require('fs');
var path = require('path');
var packageConfig = require('./lib/package-config');
var haxeUrl = require('./lib/haxe-url');
var vars = require('./lib/vars');
var Cache = require('./lib/cache');


function findPackageJson() {
	var startPath = process.cwd();
	var ignore = 0;

	var searchPath = path.join(startPath + '/..');
	var fileFound = false;
	var nextPath = '';
	var numSearch = 0;

	while (!fileFound) {
		searchPath = nextPath || searchPath;
		numSearch++;
		if(numSearch>4){
			return false;
		}
		try {
			fs.statSync(path.join(searchPath + '/package.json'));
			if (ignore > 0) {
				ignore--;
			} else {
				fileFound = true;
			}
		} catch (err) {}

		nextPath = path.join(searchPath + '/..');
		if (nextPath === path.normalize('/') || nextPath === '.' || nextPath === '..') {
			break;
		}
	}

	if (fileFound) {
		return {
			read: function () {
				return fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8');
			},
			parse: function () {
				return JSON.parse(fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8'));
			},
			path: path.join(searchPath + '/package.json')
		};
	}

	return false;
};
var pack = findPackageJson();
function getVersion(module){
    var version = packageConfig(module);
    try {
        version = pack.parse().haxeDependencies[module];
    } catch (error){
        console.warn('using default '+ module +' version');
    }
    if(version == undefined){
        version = packageConfig(module);
    }
    return version;
}

var haxeDir = vars.haxe.dir;
var haxelibDir = vars.haxelib.dir;
var nekoDir = vars.neko.dir;

var haxeVersion = getVersion('haxe');
var haxelibVersion = packageConfig('haxelib');
var nekoVersion = packageConfig('neko');

var cache = new Cache();
console.log(haxeVersion);


var platform = os.platform();
var arch = os.arch();

var isWin = platform.indexOf('win') == 0;

function clean(cb) {
    try{
        fsx.removeSync(haxeDir);
        fsx.removeSync(haxelibDir);
        fsx.removeSync(nekoDir);
    } catch(error){
        console.error(error);
    }
}

function downloadHaxe( cb ) {
	console.log("Getting Haxe " + haxeVersion );
	var url = haxeUrl(platform, arch, haxeVersion, false);
	cache.download( url , haxeDir, cb );
}

function downloadHaxelib( cb ) {
	console.log("Getting Haxelib " + haxelibVersion );
	var filename = haxelibVersion + ".tar.gz";
	var url = "https://github.com/HaxeFoundation/haxelib/archive/" + filename;
    cache.download(url , haxelibDir, cb);
}

function downloadNeko( cb ) {
	console.log("Getting NekoVM " + nekoVersion );
	var filename = 'v' + nekoVersion.split('.').join('-') + ".tar.gz";
	var url = "https://github.com/HaxeFoundation/neko/archive/" + filename;
    cache.download(url , nekoDir, cb);
}

clean();
downloadHaxe(function(err){
		if( err != null ) {
			throw err;
		}
		fs.chmodSync(path.join( haxeDir, 'haxe' + (isWin ? '.exe' : '')) , '755');
		downloadHaxelib( function(err) {
			if( err != null ) {
				throw err;
			}
			downloadNeko( function(err) {
                if( err != null ) {
                    throw err;
                }
            });
		});
	}
);
