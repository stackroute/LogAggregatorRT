var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var JSONparser = bodyParser.json();
var jsonParser=bodyParser.json();

var routes = require('./routes/index');
var users = require('./routes/users');

var function_router = require('./tattvaserver/functions/functions_routes.js');
var sideNav_router = require('./tattvaserver/Home/home_routes.js');
var watchlist_router = require('./tattvaserver/watchlists/watchlist_routes.js');
var namespace_router = require('./tattvaserver/namespace/namespaces_routes.js');
var datastream_router=require('./tattvaserver/datastreams/datastreams_routes.js');
var mongoose = require( 'mongoose' );
var watchlistslide_router=require('./tattvaserver/dashboard/watchlistroutes');
var stream_router=require('./tattvaserver/datastream/stream_routes.js')
var datasourcesrouter = require('./tattvaserver/datasources/datasources_routes.js');


var app = express();
var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/wipro';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {  console.log('Mongoose connected to ' + dbURI); });
mongoose.connection.on('error',function (err) {  console.log('Mongoose connection error: ' + err); });
mongoose.connection.on('disconnected', function () {  console.log('Mongoose disconnected'); });
process.on('SIGINT', function() {
mongoose.connection.close(function () {
console.log('Mongoose disconnected through app termination');
process.exit(0);
 });
 });

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_modules')));
app.use(express.static(path.join(__dirname, 'tattvaclient')));


app.use('/watchlist', watchlist_router);
app.use('/', routes);
app.use('/users', users);
app.use('/instance', datasourcesrouter);
app.use('/function', function_router);
app.use('/sideNav', sideNav_router);
app.use('/namespaces',namespace_router);
app.use('/datastream',stream_router)
app.use('/createslide',watchlistslide_router);


app.post('/sendslidedata', function(request, response) {
    console.log("helo");
    var body1 = request.body;
    console.log("body1 = " + body1);
});


app.get('/viewStreams', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/data.json'));
  });
app.get('/OutcomeOptions',function(req,res)
{
res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/outcomeOption.json'));
});

app.get('/fieldOption',function(req,res){
res.sendFile(path.join(__dirname,'tattvaclient/design/watchlists/json/fieldOption.json'));
});
app.get('/operatorOption',function(req,res)
{
res.sendFile(path.join(__dirname,'tattvaclient/design/watchlists/json/operatorOption.json'))
});

app.get('/viewInstance', function(req, res){
  res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/instance.json'));
});

app.get('/viewStreams', function(req, res){
  res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/data.json'));
});

app.post('/filewrite', JSONparser, function(req, res) {
    var data = req.body;
});


app.post('/publisherData', JSONparser, function(req, res) {
    var data = req.body;
    console.log(data);
});

app.get('/org_admin', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/json/admindata.json'));
});

app.post('/login_reg1',jsonParser,function (request, response) {
  var body1=request.body;

});

app.get('/login_reg', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/data.json'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
