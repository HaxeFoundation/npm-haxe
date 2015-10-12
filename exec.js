var path = require('path');
var spawn = require('child_process').spawn;

var args = process.argv.slice(2);

module.exports = function(command) {
	var env = require('./env.js');
	
	// For Node 0.6 compatibility, pipe the streams manually, instead of using
	// `{ stdio: 'inherit' }`.
	var cp = spawn(command, args, {
		env: env
	});
	cp.stdout.pipe(process.stdout);
	cp.stderr.pipe(process.stderr);
	cp.on('exit', process.exit);
	cp.on('error', function(err){
		console.error(err);
	});

	process.on('SIGTERM', function() {
	  cp.kill('SIGTERM');
	  process.exit(1);
	});
}
