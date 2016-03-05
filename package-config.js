
module.exports = function(key) {
    return process.env[ 'npm_package_config_' + key ];
}