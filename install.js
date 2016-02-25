#!/usr/bin/env node
var os = require('os');
var Download = require('download');
var mv = require('mv');
var rmrf = require('rimraf');
var fs = require('fs');
var path = require('path');
var downloadStatus = require('download-status');

var TMP = './tmp';
var CURRENT = './current';
var HAXELIB = './haxelib-client';

var packageVersion = process.env.npm_package_version;

function getConfig(key) {
	return process.env[ 'npm_package_config_' + key ];
}

var majorVersion = getConfig('version');
var haxeExtractedDirectory = 'haxe-' + majorVersion;
var nightly = getConfig('nightly');
var haxelibVersion = getConfig('haxelib_version');

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

		fs.chmodSync(path.join(CURRENT,'haxe' + (isWin ? '.exe' : '')) , '755');
		downloadHaxelib( function(err) {
			if( err != null ) {
				throw err;
			}
		});

	});
} );

function clean(cb) {
	rmrf(TMP, function(err){
		if( err != null ){
			cb( err );
		} else {
			rmrf(CURRENT,function(err){
				if( err != null ) {
					cb( err );
				} else {
					rmrf(HAXELIB, cb);
				}
			} );
			
		}
	});
	
}

function downloadHaxe( cb ) {

	console.log("Getting Haxe " + majorVersion + (nightly ? " (nightly=" + nightly + ")" : "") );
	var url = haxeUrl(platform,arch);
	downloadAndMoveTo( url , haxeExtractedDirectory, CURRENT, cb );
}

function downloadHaxelib( cb ) {

	console.log("Getting Haxelib " + haxelibVersion );
	var url = "https://github.com/HaxeFoundation/haxelib/archive/" + haxelibVersion + ".tar.gz"
	downloadAndMoveTo( url , "haxelib-" + haxelibVersion, HAXELIB, cb );

}

function downloadAndMoveTo( url , extractedDir, targetDir , cb ) {
	
	Download({ extract: true })
		.get( url )
		.dest( TMP )
		.use(downloadStatus())
		.run( function(err,files){
			if( err ) {
				console.error("Unable to download or extract " + url);
				cb(err);
			}

			mv( path.join(TMP, extractedDir) , targetDir , {mkdirp: true} , function(err){
				if( err ) {
					console.error( err );
					cb(err);
				}

				cb();
			});
		});
}

function haxeUrl( platform, arch ) {
	var version = majorVersion;
	var isNightly = !!nightly;

	var url;
	switch ( isNightly ) {
		case true: 
			url = 'http://hxbuilds.s3-website-us-east-1.amazonaws.com/builds/haxe/';
			switch( platform ) {
				case 'linux':
					url += 'linux';
					switch( arch ) {
						case 'x64': 
							url += '64';
							break;
						case 'ia32':
							url += '32';
							break;
					}
					break;
				case 'darwin':
					url += 'mac';
					break;
				case 'win32':
				case 'win64':
					url += 'windows';
					break;
			}
			url += '/haxe_'+nightly+'.tar.gz';
			break;
		default: 
			url = 'http://haxe.org/website-content/downloads/' + version + '/downloads/haxe-' + version + '-';
			switch ( platform ) {
				case 'linux': 
					url += 'linux';
					switch( arch ) {
						case 'x64': 
							url += '64';
							break;
						case 'ia32':
							url += '32';
							break;
					}
					url += '.tar.gz';
					break;
				case 'darwin':
					url += 'osx';
					url += '.tar.gz';
					break;
				case 'win32':
				case 'win64':
					url += 'win';
					url += '.zip';
					break;
				default: 
					console.error('Haxe is not compatible with your platform');
					throw 'error';
			}
	}
	
	return url;
}