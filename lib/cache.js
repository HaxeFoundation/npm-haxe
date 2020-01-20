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
    this.download = function(url, targetFolder, callback, err){
        console.log(url);
        var hash = getHash(url);
        var ref = this;
        if(fs.existsSync(cacheFolder + '/' + hash)){
            console.log("using cached version");
            ref.extract(hash,targetFolder,callback);
        } else {
            if (err === undefined) {
                err = (err) => {
                    console.error(err + " : Unable to download or extract " + url);
                    process.exit(9);
                }
            }

            console.log("Downloading...");
            
            var options = { 
                extract: true, 
                strip: 1, 
                rejectUnauthorized: process.env["NODE_TLS_REJECT_UNAUTHORIZED"] === "0"
            };

            Download(url, cacheFolder + '/' + hash, options)
                .then(() => {
                    console.log('done!');
                    ref.extract(hash,targetFolder,callback);
                })
                .catch(err);
    	}
    }

    this.extract = function(hash, targetFolder, callback){
        var url = cacheFolder + '/' + hash;
        fsx.copySync(url, targetFolder);
        callback();
    }
}


module.exports = Cache;