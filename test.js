var assert = require('assert');
var packageConfig = require('./lib/package-config');

var haxe = require('./index').haxe;
var haxelib = require('./index').haxelib;

function readAll( ps, cb ) {
    var out = [], err = [];

    ps.stderr.on('data', function(data){
        err.push(data);
    });

    ps.stdout.on('data', function(data){
        out.push(data);
    });

    ps.on('close', function(code){
        cb( Buffer.concat(err), Buffer.concat(out), code );
    });
}

readAll( haxe.spawn('-version') , function(err,out,code){
    assert.equal( 
        err.toString().split(" ").shift().trim(), 
        packageConfig("version"),
        "`haxe -version` should match package config version"
    );
    assert.equal(code,0);
});

// same as above in "execFile" mode
haxe.exec('-version', function(err,stdout,stderr){
    assert.equal( 
        stderr.toString().split(" ").shift().trim(), 
        packageConfig("version"),
        "`haxe -version` should match package config version"
    );
});

readAll( haxelib.spawn('list') , function(err,out,code){
    assert.equal(code,0,"list packages");
});

