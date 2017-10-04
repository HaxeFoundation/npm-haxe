#!/usr/bin/env node
var os = require('os');
var Download = require('download');
var mv = require('mv');
var rmrf = require('rimraf');
var fs = require('fs');
var path = require('path');
var downloadStatus = require('download-status');
var packageConfig = require('./lib/package-config');
var haxeUrl = require('./lib/haxe-url');

var vars = require('./lib/vars');

var tmpDir = 'tmp';
var haxeDir = path.dirname( vars.haxe.path );

var majorVersion = packageConfig('version');
var nightly = packageConfig('nightly');

var platform = os.platform();
var arch = os.arch();

var isWin = platform.indexOf('win') == 0;

clean( function(err){
	if( err != null ) {
		throw err;
	}
	downloadHaxe(function(err){
		if( err != null ) {
			throw err;
		}
	});
} );

function clean(cb) {
	rmrf(tmpDir, function(err){
		if( err != null ){
			cb( err );
		} else {
			rmrf(haxeDir,function(err){
				if( err != null ) {
					cb( err );
				} else {
					cb( null );
				}
			} );
			
		}
	});
	
}

function downloadHaxe( cb ) {

	console.log("Getting Haxe " + majorVersion + (nightly ? " (nightly=" + nightly + ")" : "") );
	var url = haxeUrl(platform, arch, majorVersion, nightly);
	downloadAndMoveTo( url, haxeDir, cb );
}

function downloadAndMoveTo( url, targetDir, cb ) {
	
	Download({ extract: true })
		.get( url )
		.dest( tmpDir )
		.use(downloadStatus())
		.run( function(err,files){
			if( err ) {
				console.error("Unable to download or extract " + url);
				cb(err);
			}

			var extractedDirs = fs.readdirSync(tmpDir)
				.filter(function(sub){
					return (sub.indexOf('haxe') === 0) && fs.statSync(path.join(tmpDir, sub)).isDirectory();
				});

			if( extractedDirs.length != 1 ) {
				console.error("Unable to determine extracted directory between", extractedDirs);
			}

			var extractedDir = extractedDirs[0];

			mv( path.join(tmpDir, extractedDir) , targetDir , {mkdirp: true} , function(err){
				if( err ) {
					console.error( err );
					cb(err);
				}
				cb();
			});
		});
}
