/**
 * Main application routes
 */

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database);

// http://localhost:PORT/api
exports.api = function(req, res) {
    res.json({ message: '<%= apiName %>' + ' v' + (require('../package').version)});
};

// ...
