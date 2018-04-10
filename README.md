# npm-haxe v5
[![TravisCI Build Status](https://travis-ci.org/HaxeFoundation/npm-haxe.svg?branch=master)](https://travis-ci.org/HaxeFoundation/npm-haxe)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/HaxeFoundation/npm-haxe?branch=master&svg=true)](https://ci.appveyor.com/project/HaxeFoundation/npm-haxe)
[![dependencies Status](https://david-dm.org/HaxeFoundation/npm-haxe/status.svg)](https://david-dm.org/HaxeFoundation/npm-haxe)

Installs [Haxe](http://haxe.org) using [Node Package Manager](https://www.npmjs.com/) aka `npm` 

**WARNING : The version contains breaking changes from npm-haxe v4**

## Key-features

* Global or per-project, sandboxed, standard Haxe installation
* Includes [Haxelib](http://lib.haxe.org/)
* Includes [Neko](https://nekovm.org)
* Support both Haxelib and NPM dependencies 
* Tested on Ubuntu/Linux and Windows

## Usage

### CLI installation

```bash
npm install haxe
```

By default, this will make `haxe` and `haxelib` available to [npm scripts](https://docs.npmjs.com/misc/scripts) only,
with haxelib repository sandboxed to your current working directory.

To have `haxe` and `haxelib` commands available globally, use the `-g` flag.
This will also make the haxelib repo global.

### Package.json sample

```js
{
  "scripts":{
    "postinstall": "haxelib --always install build.hxml",
    "build": "haxe build.hxml"
  },
  "dependencies": {
    "haxe": "5.0.0" // the npm haxe module
  },
 "haxeDependencies": {
   "haxe": "3.4.7", // haxe version
   "haxelib": "3.3.0", // haxelib version
   "neko": "2.2.0", // neko version
   "pixijs": "4.5.5", // additionnal haxelib dependency
   "perfjs": "1.1.18"
 }
}
```

Please notice the `--always` flag in the `haxelib` command, to avoid having to confirm haxelibs installation.

### Running Haxe from NodeJS

This package also comes with the minimal bindings to run the Haxe compiler from NodeJS.


```js
var haxe = require('haxe').haxe;
var haxelib = require('haxe').haxelib;

// all commands return a ChildProcess instance

haxe( "-version" );
haxelib( "install", "hxnodejs" );

var server = haxe("--wait", "6000");
```

See also [test.js](https://github.com/HaxeFoundation/npm-haxe/blob/master/test.js)


### Configuration options

The following configuration options can be set in your package.json. 

Please note they must be set before installing the package.

```json
"haxeDependencies": {
   "haxe": "3.4.7",
   "haxelib": "3.3.0",
   "neko": "2.2.0",
   "pixijs": "4.5.5",
   "perfjs": "1.1.18"
 }
```

#### Version

See [Haxe Download list](http://haxe.org/download/list/).
Please notice the directory name in the archive must match.

In this case, the `haxeDependencies.haxe` value is still used, and must match the one of the directory extracted from the archive.

#### Haxelib

`haxeDependencies.haxelib` must match a release from the [official Haxelib repo](https://github.com/HaxeFoundation/haxelib/releases)

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
