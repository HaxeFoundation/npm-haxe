var haxelib = require('..').haxelib;

var InstallHaxelibDependenciesTask = function (deps) {
    this.dependencies = deps;
};

InstallHaxelibDependenciesTask.prototype.run = function(executeNextStep) {
    console.log("Installing Haxelib Dependencies" );
    for(var module in this.dependencies ){
        if(module != "haxe" && module != "haxelib" && module != "neko"){
            console.log(module + ":" + this.dependencies[module]);
            var bat = haxelib( "install", module + " " + this.dependencies[module] );
		bat.stdout.on('data', (data) => {
		  console.log(data.toString());
		});

		bat.stderr.on('data', (data) => {
		  console.log('error : ' , data.toString());
		});

		bat.on('exit', (code) => {
		  console.log(`Child exited with code ${code}`);
		});

        }
    }
};

module.exports.InstallHaxelibDependenciesTask = InstallHaxelibDependenciesTask;
