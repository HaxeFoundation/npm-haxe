
module.exports = function(key) {
    return process.env[ 'npm_package_haxeDependencies_' + key ];
}