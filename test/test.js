#!/usr/bin/env node
var assert = require('assert');
var fs = require('fs');
var fsx = require('fs-extra');

assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/haxe/std/Any.hx"))
assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/haxelib/haxelib.json"))
assert.ok(fsx.pathExistsSync("node_modules/haxe/downloads/neko/README.md"))


console.log("end test");