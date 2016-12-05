#!/usr/bin/env node
var os = require('os');
var Download = require('download');
var rmrf = require('rimraf');
var fs = require('fs');
var path = require('path');
var downloadStatus = require('download-status');
var packageConfig = require('./lib/package-config');
var haxeUrl = require('./lib/haxe-url');
var parent = require('parent-package-json');

var vars = require('./lib/vars');

var haxeDir = vars.haxe.dir;
var haxelibDir = vars.haxelib.dir;

var haxeVersion = packageConfig('version');
try {
	haxeVersion = parent().parse().config.haxe;
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
	downloadAndMoveTo( url , haxeDir, cb );
}

function downloadHaxelib( cb ) {
	console.log("Getting Haxelib " + haxelibVersion );
	var url = "https://github.com/HaxeFoundation/haxelib/archive/" + haxelibVersion + ".tar.gz";
	downloadAndMoveTo( url , haxelibDir, cb );
}

function downloadAndMoveTo( url, targetDir, cb ) {
	Download({ extract: true, strip: 1 })
		.get( url )
		.dest( targetDir )
		.use(downloadStatus())
		.run( function(err,files){
			if( err ) {
				console.error("Unable to download or extract " + url);
				cb(err);
			}
			cb();
		});
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