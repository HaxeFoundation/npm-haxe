# npm-haxe

Installs [Haxe](http://haxe.org) using [Node Package Manager](https://www.npmjs.com/) aka `npm` 

## Key-features

* Global or per-project, sandboxed, standard Haxe installation
* No dependency to Neko/libneko
* Includes [Haxelib](http://lib.haxe.org/)
* Tested on Ubuntu/Linux and Windows

## Usage

### CLI installation

```bash
npm install clemos/npm-haxe
```

By default, this will make `haxe` and `haxelib` available to [npm scripts](https://docs.npmjs.com/misc/scripts) only,
with haxelib repository sandboxed to your current working directory.

To have `haxe` and `haxelib` commands available globally, use the `-g` flag.
This will also make the haxelib repo global.

### Package.json sample

```json
{
  "scripts":{
    "postinstall": "haxelib install build.hxml",
    "build": "haxe build.hxml"
  },
  "dependencies": {
    "haxe": "clemos/npm-haxe"
  }
}
```

### Configuration options [Experimental]

These are not very well tested, as I'm not even sure how they are supposed to work...

```json
{
    "version": "3.2.1",
    "nightly": "",
    "haxelib_version": "3.2.0-rc.1"
}
```

#### Version

See [Haxe Download list](http://haxe.org/download/list/).
Please notice the directory name in the archive must match.

#### Nightlies

`nightly` value can be, for example `"2016-02-25_development_7c4fd45"`, 
for current latest [nightly build](http://hxbuilds.s3-website-us-east-1.amazonaws.com/builds/haxe/index.html).

In this case, the `version` value is still used, and must match the one of the directory extracted from the archive.

#### Haxelib

`haxelib_version` must match a release from the [official Haxelib repo](https://github.com/HaxeFoundation/haxelib/releases)
