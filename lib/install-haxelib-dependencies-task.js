var proc = require('child_process');

var InstallHaxelibDependenciesTask = function (deps) {
    this.dependencies = deps;
};

InstallHaxelibDependenciesTask.prototype.run = function(executeNextStep) {
    var options = {
            cwd : process.env.INIT_CWD
        }
    console.log("Installing Haxelib Dependencies to " + options.cwd );
    proc.spawnSync("haxelib", ["newrepo"], options);
    for(var module in this.dependencies ){
        if(module != "haxe" && module != "haxelib" && module != "neko"){
        console.log(module + ":" + this.dependencies[module]);
         proc.spawnSync("haxelib", ["install",module,this.dependencies[module]], options);
         }
    }

};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;