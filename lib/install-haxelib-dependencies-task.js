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
            var version = this.dependencies[module];
            console.log("version - " + version);
            if (version !== undefined && version.indexOf("git+") == 0){
                console.log("git - " + module + ":" + version);
                var gitRepo = version.substring(4, version.length);
                console.log(module + ":" + gitRepo);

                var r = proc.spawnSync("haxelib", ["git",module,gitRepo], options);
                if(r.stdout != null) {console.log(r.stdout.toString());};
                if(r.stderr != null){console.log(r.stderr.toString());}
                
            } else {   
                console.log("install - " + module + ":" + version);
                var r = proc.spawnSync("haxelib", ["install",module,version], options);
                if(r.stdout != null) {console.log(r.stdout.toString());};
                if(r.stderr != null){console.log(r.stderr.toString());}
            }
            

        }
    }
};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;
