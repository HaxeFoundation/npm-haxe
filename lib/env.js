var vars = require('./vars');
var env = module.exports = {};

function merge( base , obj ) {
    for( k in obj ) {
        base[k] = obj[k];
    }
}

merge( env, process.env );
merge( env, vars.env );

