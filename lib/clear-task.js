var fsx = require('fs-extra');
var vars = require(__dirname + '/vars');

var ClearTask = function () {
};

ClearTask.prototype.run = function(executeNextStep) {
    console.log('clean folder');
    try{
        fsx.removeSync(vars.haxe.dir);
        fsx.removeSync(vars.haxelib.dir);
        fsx.removeSync(vars.neko.dir);
    } catch(error){
        console.error(error);
    }
    executeNextStep();
};

module.exports.ClearTask = ClearTask;
