var haxelib = require('..').haxelib;
var proc = require('child_process');

var InstallHaxelibDependenciesTask = function (deps) {
    this.dependencies = deps;
};

InstallHaxelibDependenciesTask.prototype.run = function(executeNextStep) {
    console.log("Installing Haxelib Dependencies" );
    var options = {
            cwd : process.env.INIT_CWD,
            stdio: [process.stdin, process.stdout, process.stderr],
            encoding: 'utf-8'
        }

    for(var module in this.dependencies ){
        if(module != "haxe" && module != "haxelib" && module != "neko"){
            var version = this.dependencies[module];
            if (version !== undefined && version.indexOf("git+") == 0){
                var gitRepo = version.substring(4, version.length);
                console.log(module + ":" + gitRepo);
                var branch = null;
                var args = ["git", module];
                if (gitRepo.indexOf("#") != -1){
                    var split = gitRepo.split("#");
                    gitRepo = split[0];
                    branch = split[1];
                    args.push(gitRepo);
                    args.push(branch);
                } else {
                    args.push(gitRepo);
                }
                args.push("--never");
                console.log("haxelib", args);
                var r = proc.spawnSync("haxelib", args, options);
                
            } else {   
                console.log(module + ":" + version);
                var r = proc.spawnSync("haxelib", ["install", module, version, "--never"], options);
            }
        }
    }
};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;
