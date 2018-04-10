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
        console.log(url);
        var hash = getHash(url);
        var ref = this;
        if(fs.existsSync(cacheFolder + '/' + hash)){
            console.log("using cached version");
            ref.extract(hash,targetFolder,callback);
        } else {
            console.log("Downloading...")
            Download(url,cacheFolder + '/' + hash,{ extract: true, strip: 1 })
            .then(() => {
                console.log('done!');
                ref.extract(hash,targetFolder,callback);
            })
            .catch((err) => {
                console.error(err + " : Unable to download or extract " + url);
                process.exit(9);
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