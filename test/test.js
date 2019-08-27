#!/usr/bin/env node
console.log("start test");

var assert = require('assert');
var fsx = require('fs-extra');
var haxe = require('haxe').haxe;
var haxelib = require('haxe').haxelib;
var neko = require('haxe').neko;

assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/haxe/std/Any.hx"))
assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/haxelib/haxelib.json"))
assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/neko/README.md"))

assert.ok(haxe);
assert.ok(haxelib);
assert.ok(neko);

var haxeProcess = haxe( "-version" );

haxeProcess.stderr.on('data', (data) => {
    //console.log('ee '+data.toString('utf8'));
    assert.ok(data.toString('utf8').indexOf('3.4.7') >= 0);
});

var haxelibProcess = haxelib( "help" );

haxelibProcess.stderr.on('data', (data) => {
    //console.log('ee '+data.toString('utf8'));
    assert.ok(data.toString('utf8').indexOf('3.3.0') >= 0);
});

var nekoProcess = neko( "-version" );

nekoProcess.stderr.on('data', (data) => {
    //console.log('ee '+data.toString('utf8'));
    assert.ok(data.toString('utf8').indexOf('2.1.0') >= 0);
});


console.log("end test");
