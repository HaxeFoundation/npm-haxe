var os = require('os');
var fs = require('fs');
var fsx = require('fs-extra')
var Download = require('download');
var downloadStatus = require('download-status');
var crypto = require('crypto');

var cacheFolder = os.homedir() + '/.haxe_cache';
if(!fs.existsSync(cacheFolder)){
    fs.mkdirSync(cacheFolder);
}

var getHash = function ( data ) {
     var generator = crypto.createHash('sha1');
     generator.update( data )
     return generator.digest('hex')
}

function Cache(){

    this.download = function(url, targetFolder, callback){
        var hash = getHash(url);
        var ref = this;
        if(fs.existsSync(cacheFolder + '/' + hash)){
            console.log("using cached version");
            ref.extract(hash,targetFolder,callback);
        } else {
            console.log("Downloading")
            Download({ extract: true, strip: 1 })
                .get( url )
                .dest( cacheFolder + '/' + hash )
                .use(downloadStatus())
                .run( function(err,files){
                    if( err ) {
                        console.error("Unable to download or extract " + url);
                        callback(err);
                    }
                    ref.extract(hash,targetFolder,callback);
            });
    	}
    }

    this.extract = function(hash, targetFolder, callback){
        var url = cacheFolder + '/' + hash;
        fsx.copySync(url, targetFolder);
        callback();
    }
}


module.exports = Cache;