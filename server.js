var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var items = require('./routes/items');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('view cache', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("X-Powered-By", "todoRestService");
    next();
});

app.use('/api/items', items);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// will print stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.listen(app.get('port'));
console.log("Express server listening on port " + app.get('port'));
console.log("Node version: " + process.versions.node);
console.log("Environment: " + app.get('env'));

module.exports = app;
