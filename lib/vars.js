var path = require('./path');

var vars = module.exports = {
    haxe : {
        path: path('current/haxe')
    },
    haxelib : {
        path: path('current/haxe'),
        args: [
            '-cp', path('haxelib-client/src'),
            '--run', 'haxelib.client.Main'
        ],
        dir: path('haxelib-client')
    },
    env : {
        HAXELIB_PATH : path('.haxelib'),
        HAXE_STD_PATH : path('current/std')
    }
}