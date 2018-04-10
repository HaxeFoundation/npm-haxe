#!/usr/bin/env node
var os = require('os');
var fsx = require('fs-extra');
var fs = require('fs');
var path = require('path');
var packageConfig = require('./lib/package-config');
var haxeUrl = require('./lib/haxe-url');
var vars = require('./lib/vars');
var localConfig = require('./package.json');
var Cache = require('./lib/cache');
var TaskRunner = require('./lib/task-runner').TaskRunner;
var ClearTask = require('./lib/clear-task').ClearTask;
var DownloadHaxeTask = require('./lib/download-haxe-task').DownloadHaxeTask;
var DownloadHaxelibTask = require('./lib/download-haxelib-task').DownloadHaxelibTask;
var DownloadNekoTask = require('./lib/download-neko-task').DownloadNekoTask;
var InstallHaxelibDependenciesTask = require('./lib/install-haxelib-dependencies-task').InstallHaxelibDependenciesTask;


function findPackageJson() {
	var startPath = process.cwd();
	var ignore = 0;

	var searchPath = path.join(startPath + '/..');
	var fileFound = false;
	var nextPath = '';
	var numSearch = 0;

	while (!fileFound) {
		searchPath = nextPath || searchPath;
		numSearch++;
		if(numSearch>4){
			return false;
		}
		try {
			fs.statSync(path.join(searchPath + '/package.json'));
			if (ignore > 0) {
				ignore--;
			} else {
				fileFound = true;
			}
		} catch (err) {}

		nextPath = path.join(searchPath + '/..');
		if (nextPath === path.normalize('/') || nextPath === '.' || nextPath === '..') {
			break;
		}
	}

	if (fileFound) {
		return {
			read: function () {
				return fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8');
			},
			parse: function () {
				return JSON.parse(fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8'));
			},
			path: path.join(searchPath + '/package.json')
		};
	}

	return false;
};
var pack = findPackageJson();

function getHaxeDependencies(){
    var deps = [];
    try {
        deps = pack.parse().haxeDependencies;
    } catch (error){
      console.warn('no dependencies');
    }
    return deps;
}

function getVersion(module){
    var version = packageConfig(module);
    try {
        version = getHaxeDependencies()[module];
    } catch (error){
        console.warn('using default '+ module +' version');
    }
    if(version == undefined){
        version = localConfig.haxeDependencies[module];
    }
    return version;
}

var runner = new TaskRunner();

runner.addTask(new ClearTask());
runner.addTask(new DownloadHaxeTask(getVersion('haxe')));
runner.addTask(new DownloadHaxelibTask(getVersion('haxelib')));
runner.addTask(new DownloadNekoTask(getVersion('neko')));
runner.addTask(new InstallHaxelibDependenciesTask(getHaxeDependencies()));

runner.run();