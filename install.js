#!/usr/bin/env node
var os = require('os');
var rmrf = require('rimraf');
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

var haxeDir = vars.haxe.dir;
var haxelibDir = vars.haxelib.dir;

var haxeVersion = packageConfig('version');

var cache = new Cache();
try {
	var pack = findPackageJson();
	if(pack != false) {
		haxeVersion = pack.parse().config.haxe;
	}
} catch (error){
	console.warn('using default version');
}
if(haxeVersion == undefined){
	haxeVersion = packageConfig('version');
}

var nightly = packageConfig('nightly');
var haxelibVersion = packageConfig('haxelib_version');
try {
	haxelibVersion = parent().parse().config.haxelib;
} catch (error){
	console.warn('using default haxelib version');
}
if(haxelibVersion == undefined){
	haxelibVersion = packageConfig('haxelib_version');
}

var platform = os.platform();
var arch = os.arch();

var isWin = platform.indexOf('win') == 0;

function clean(cb) {
	rmrf(haxeDir,function(err){
		if( err != null ) {
			cb( err );
		} else {
			rmrf(haxelibDir, cb);
		}
	} );
}

function downloadHaxe( cb ) {
	console.log("Getting Haxe " + haxeVersion + (nightly ? " (nightly=" + nightly + ")" : "") );
	var url = haxeUrl(platform, arch, haxeVersion, nightly);
	cache.download( url , haxeDir, cb );
}

function downloadHaxelib( cb ) {
	console.log("Getting Haxelib " + haxelibVersion );
	var filename = haxelibVersion + ".tar.gz";
	var url = "https://github.com/HaxeFoundation/haxelib/archive/" + filename;
    cache.download(url , haxelibDir, cb);

}

clean( function(err){
	if( err != null ) {
		throw err;
	}
	downloadHaxe(function(err){
		if( err != null ) {
			throw err;
		}

		fs.chmodSync(path.join( haxeDir, 'haxe' + (isWin ? '.exe' : '')) , '755');
		downloadHaxelib( function(err) {
			if( err != null ) {
				throw err;
			}
		});
	});
} );