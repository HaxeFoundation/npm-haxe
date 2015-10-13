var os = require('os');
var Download = require('download');
var Fs = require('fs-extra');
var fs = require('fs');
var path = require('path');

var TMP = './tmp';
var CURRENT = './current';

var packageVersion = process.env.npm_package_version;

var archiveConf = {
	"nightly": false,
	"haxe_version": "3.2.0",
    "extracted_directory": "haxe-3.2.0"
}

var haxeVersion = archiveConf['haxe_version'];
var extractedDirectory = archiveConf['extracted_directory'];
var isNightly = archiveConf['nightly'];

var platform = os.platform();
var arch = os.arch();

clean( function(err){
	if( err != null ) {
		console.error(err);
	} else {
		download();
	}
} );

function clean(cb) {
	Fs.emptyDir(TMP, function(err){
		if( err != null ){
			cb( err );
		} else {
			Fs.remove(CURRENT, cb);
		}
	});
	
}

function download() {

	console.log("Getting Haxe " + haxeVersion);

	var url = haxeUrl(platform, arch, haxeVersion, isNightly);

	console.log("Downloading: " + url );

	Download({ extract: true })
		.get( url )
		.dest( TMP )
		.run( onExtracted );
}

function onExtracted( err, files ) {
	if( err ) {
		console.error(err);
		return;
	}

	Fs.move( path.join(TMP, extractedDirectory) , CURRENT , function(err){
		if( err ) {
			console.error( err );
		}

		fs.chmodSync(path.join(CURRENT, 'haxe'), '755');
		fs.chmodSync(path.join(CURRENT, 'haxelib'), '755');
		
	});

}

function haxeUrl( platform, arch, version, isNightly ) {
	
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
			url += '/haxe_latest.tar.gz';
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
					url += 'win32';
					url += '.zip';
					break;
				default: 
					console.error('Haxe is not compatible with your platform');
			}
	}
	
	return url;
}