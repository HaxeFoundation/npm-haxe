package js.npm;

import haxe.extern.Rest;
import js.node.child_process.ChildProcess;
import js.node.ChildProcess.ChildProcessExecCallback;

typedef HaxeCommand = {
    var spawn : Rest<String> -> ChildProcess;
    var exec : Array<String> -> ChildProcessExecCallback -> Void;
    var cli : Void->Void;
}

#if internaltest
@:jsRequire('../index.js')
#else
@:jsRequire('haxe')
#end
extern class Haxe {
    public static var haxe : HaxeCommand;
    public static var haxelib : HaxeCommand;
}
