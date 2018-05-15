var haxelib = require('..').haxelib;
var proc = require('child_process');

var InstallHaxelibDependenciesTask = function (deps) {
    this.dependencies = deps;
};

InstallHaxelibDependenciesTask.prototype.run = function(executeNextStep) {
    console.log("Installing Haxelib Dependencies" );
    var options = {
            cwd : process.env.INIT_CWD
        }

    for(var module in this.dependencies ){
        if(module != "haxe" && module != "haxelib" && module != "neko"){
            console.log(module + ":" + this.dependencies[module]);
            var r = proc.spawnSync("haxelib", ["install",module,this.dependencies[module]], options);
	    if(r.stdout != null) {console.log(r.stdout.toString());};
	    if(r.stderr != null){console.log(r.stderr.toString());}

        }
    }
};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;
