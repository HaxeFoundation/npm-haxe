var haxelib = require('..').haxelib;

var InstallHaxelibDependenciesTask = function (deps) {
    this.dependencies = deps;
};

InstallHaxelibDependenciesTask.prototype.run = function(executeNextStep) {
    console.log("Installing Haxelib Dependencies" );
    for(var module in this.dependencies ){
        if(module != "haxe" && module != "haxelib" && module != "neko"){
            console.log(module + ":" + this.dependencies[module]);
            haxelib( "install", module + " " + this.dependencies[module] );
        }
    }
};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;