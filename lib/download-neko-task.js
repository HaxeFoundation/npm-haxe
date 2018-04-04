var Cache = require(__dirname + '/cache');
var vars = require(__dirname + '/vars');
var os = require('os');

var DownloadNekoTask = function (version) {
    this.nekoVersion = version;
};

DownloadNekoTask.prototype.run = function(executeNextStep) {
    console.log("Getting NekoVM " + this.nekoVersion );
    var version = this.nekoVersion.split('.').join('-');
    var plateform="";
     switch ( os.platform() ) {
        case 'linux':
            plateform = 'linux.tar.gz';
            if( os.arch() == 'x64' ) {
                plateform = 'linux64.tar.gz';
            }
            break;
        case 'darwin':
            plateform = 'osx64.tar.gz';
            break;
        case 'win32':
            plateform = 'win.zip';
        case 'win64':
            plateform = 'win64.zip';
            break;
        default:
            console.error('Haxe is not compatible with your platform');
            throw 'error';
    }
    var url = "https://github.com/HaxeFoundation/neko/releases/download/v"+version+"/neko-"+this.nekoVersion+"-"+plateform;
    var cache = new Cache();
    cache.download( url ,  vars.neko.dir, executeNextStep );
};

module.exports.DownloadNekoTask = DownloadNekoTask;