var Cache = require(__dirname + '/cache');
var vars = require(__dirname + '/vars');
var os = require('os');

var DownloadHaxelibTask = function (version) {
    this.haxelibVersion = version;
};

DownloadHaxelibTask.prototype.run = function(executeNextStep) {
    console.log("Getting Haxelib " + this.haxelibVersion );
    var filename = this.haxelibVersion + ".tar.gz";
    var url = "https://github.com/HaxeFoundation/haxelib/archive/" + filename;
    var cache = new Cache();
    cache.download( url ,  vars.haxelib.dir, executeNextStep );
};

module.exports.DownloadHaxelibTask = DownloadHaxelibTask;