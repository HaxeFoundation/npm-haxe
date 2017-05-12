var path = require('./path');

var vars = module.exports = {
    haxe : {
        path: path('current/haxe')
    },
    haxelib_bin : {
        path: path('current/haxelib')
    },
    haxelib_interp : {
        path: path('current/haxe'),
        args: [
            '-cp', path('current/extra/haxelib_src/src'),
            '--run', 'haxelib.client.Main'
        ]
    },
    env : {
        HAXELIB_PATH : path('.haxelib'),
        HAXE_STD_PATH : path('current/std')
    }
}