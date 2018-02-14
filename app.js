var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var book = require('./routes/book');
var angular = require('./routes/angular');
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular5', {promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


// View engine
app.set('view engine', 'html');
app.set('views', 'dist');

// ******************************************
// MIDDLEWARE
// ******************************************
// Morgan
app.use(logger('dev'));

// Body-Parser
app.use(bodyParser.json());

// ******************************************
// ROUTES
// ******************************************
// Route for Angular
app.use('/', angular);

// Route for APIs go here
app.use('/api/books', book);

// ******************************************
// API ERROR HANDLER
// ******************************************
// Error handler for 404 - Page Not Found
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    res.status(404).json({
        status: 404,
        message: err.message,
        name: err.name
    });
});

// Error handler for all other errors
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({
        status: 500,
        message: err.message,
        name: err.name
    });
});

module.exports = app;