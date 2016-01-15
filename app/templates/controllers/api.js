/**
 * Main application routes
 */

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.database);

/* instantiate your models here

*/

// GET /api
exports.api = function(req, res) {
    res.json({ message: '<%= apiName %>' + ' v' + (require('../package').version)});
};

// ...
