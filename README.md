# npm-haxe 
[![Build Status](https://travis-ci.org/HaxeFoundation/npm-haxe.svg?branch=master)](https://travis-ci.org/HaxeFoundation/npm-haxe)

Installs [Haxe](http://haxe.org) using [Node Package Manager](https://www.npmjs.com/) aka `npm` 

## Key-features

* Global or per-project, sandboxed, standard Haxe installation
* No dependency to Neko/libneko (except for `haxelib run ...`)
* Includes [Haxelib](http://lib.haxe.org/)
* Tested on Ubuntu/Linux and Windows

## Usage

### CLI installation

```bash
npm install haxe@next
```

By default, this will make `haxe` and `haxelib` available to [npm scripts](https://docs.npmjs.com/misc/scripts) only,
with haxelib repository sandboxed to your current working directory.

To have `haxe` and `haxelib` commands available globally, use the `-g` flag.
This will also make the haxelib repo global.

### Package.json sample

```json
{
  "scripts":{
    "postinstall": "haxelib --always install build.hxml",
    "build": "haxe build.hxml"
  },
  "dependencies": {
    "haxe": "next"
  }
}
```

Please notice the `--always` flag in the `haxelib` command, to avoid having to confirm haxelibs installation.

### Running Haxe from NodeJS

This package also comes with the minimal bindings to run the Haxe compiler from NodeJS.


```js
var haxe = require('haxe').haxe;
var haxelib = require('haxe').haxelib;

// all `spawn` calls return a ChildProcess instance

haxe.spawn( "-version" );
haxelib.spawn( "install", "hxnodejs" );

var server = haxe.spawn("--wait", "6000");

```

See also [test.js](https://github.com/HaxeFoundation/npm-haxe/blob/master/test.js)


### Configuration options

The following configuration options can be set in your package.json. 

Please note they must be set before installing the package.

```json
"config": {
    "haxe:version": "3.2.1",
    "haxe:nightly": "",
    "haxe:haxelib_version": "3.2.0-rc.1"
}
```

#### Version

See [Haxe Download list](http://haxe.org/download/list/).
Please notice the directory name in the archive must match.

#### Nightlies

`haxe:nightly` value can be, for example `"2016-02-25_development_7c4fd45"`, 
for current latest [nightly build](http://hxbuilds.s3-website-us-east-1.amazonaws.com/builds/haxe/index.html).

In this case, the `haxe:version` value is still used, and must match the one of the directory extracted from the archive.

### Known issues

The package relies on the `node` command, which [has issues on some Ubuntu versions] (http://stackoverflow.com/questions/21168141/cannot-install-packages-using-node-package-manager-in-ubuntu).

If you get an error similar to this :
```
sh: 1: node: not found
npm WARN This failure might be due to the use of legacy binary "node"
npm WARN For further explanations, please read /usr/share/doc/nodejs/README.Debian
```
Just install the `nodejs-legacy` package:
```bash
sudo apt-get install nodejs-legacy
```
