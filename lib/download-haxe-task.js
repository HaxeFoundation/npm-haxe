var haxeUrl = require(__dirname + '/haxe-url');
var Cache = require(__dirname + '/cache');
var vars = require(__dirname + '/vars');
var os = require('os');

var DownloadHaxeTask = function (version) {
    this.haxeVersion = version;
};

DownloadHaxeTask.prototype.run = function(executeNextStep) {
    console.log("Getting Haxe " + this.haxeVersion + " for " + os.platform() );
	var url = haxeUrl(os.platform(), os.arch(), this.haxeVersion, false);
	var cache = new Cache();
	cache.download( url ,  vars.haxe.dir, executeNextStep );
};

module.exports.DownloadHaxeTask = DownloadHaxeTask;