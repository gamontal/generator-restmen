/**
 * Main application file
 */

var express = require('express');
var morgan = require('morgan');
var app = express();
var config = require('./config');

// use morgan to log request to the console
app.use(morgan('dev'));

var controller = require('./controllers/api'); // API controller
var routes = express.Router();

routes.route('/').get(controller.api);

/* add your routes here

*/

// initialize routes with the /api prefix
app.use('/api', routes);

// catch 404 status code
app.get('*', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.status(404).send(JSON.stringify({ message: 'Not Found' }, 2, 2));
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start the server
app.listen(config.port, function() {
    console.log('Listening on port ' + config.port);
});
