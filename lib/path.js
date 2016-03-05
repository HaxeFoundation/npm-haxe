var path = require('path');

module.exports = function(p) {
    return path.join(__dirname, '..', p);
}