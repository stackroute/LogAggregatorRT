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

//functions demo



var watchlistslide_router=require('./tattvaserver/dashboard/watchlistroutes');
// var function_router = require('./tattvaserver/functions/functions_routes.js');
// var sideNav_router = require('./tattvaserver/Home/home_routes.js');
// var watchlist_router = require('./tattvaserver/watchlists/watchlist_routes.js');
// var namespace_router = require('./tattvaserver/namespace/namespaces_routes.js');
var stream_router=require('./tattvaserver/datastream/stream_routes.js')
// var watchlist_router = require(path.join(__dirname,'/tattvaserver/watchlists/watchlist_routes.js'));
var app = express();

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

var app = express();






// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_modules')));
app.use(express.static(path.join(__dirname, 'tattvaclient')));

//mongoose connection
var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/wipro';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var datasourcesrouter = require('./tattvaserver/datasources/datasources_routes.js');


app.use('/', routes);
app.use('/users', users);
app.use('/instance', datasourcesrouter);

//end of mongoose


var data1 = [];

app.get('/namespaces', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/json/listnamespace.json'));
});
app.post('/namespaces', jsonParser, function(request, response) {
    var body1 = request.body;
    console.log(body1); //in body1 we have the data to be stored in the database
});
app.put('/namespace/', jsonParser, function(request, response) {
    var body1 = request.body;
    console.log("body1 put", body1); //in body1 we have the data to be stored in the database
});

app.get('/namespace/', function(req, res) {
    console.log("namespace name from server", req.query.name);
    // return req.params.name;
    // res.sendFile(path.join(__dirname, 'public/json/listnamespace.json'));

    var data = [{
        "name": "apache",
        "description": "This is the data format for namespace apache",
        "dataformat": [{
            "fieldAlias": "method",
            "fieldName": "Method name",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "code",
            "fieldName": "response code",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "hitsPerSecond",
            "fieldName": " second",
            "fieldType": "measure"
        }]
    }, {
        "name": "NGINX",
        "description": "This is the data format for namespace NGINX",
        "dataformat": [{
            "fieldAlias": "method",
            "fieldName": "Method name",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "code",
            "fieldName": "response code",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "hitsPerSecond",
            "fieldName": "Number of hits per second",
            "fieldType": "measure"
        }]
    }, {
        "name": "BOA",
        "description": "This is the data format for namespace BOA",
        "dataformat": [{
            "fieldAlias": "method",
            "fieldName": "Method name",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "code",
            "fieldName": "response code",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "hitsPerSecond",
            "fieldName": "Number of hits per second",
            "fieldType": "measure"
        }]
    }, {
        "name": "IOT",
        "description": "This is the data format for namespace IOT",
        "dataformat": [{
            "fieldAlias": "method",
            "fieldName": "Method name",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "code",
            "fieldName": "response code",
            "fieldType": "dimension"
        }, {
            "fieldAlias": "hitsPerSecond",
            "fieldName": "Number of hits per second",
            "fieldType": "measure"
        }]
    }, ];

    var result = {
        "_id": 0,
        "name": "apache",
        "description": "This is the data format for namespace apache",
        "organisation": "Wipro",
        "createdBy": "Rahul",
        "editedBy": "user123",
        "archived": "false",
        "dataformat": [{
            "_id": 0,
            "fieldAlias": "method",
            "fieldName": "Name",
            "fieldType": "dimension"
        }, {
            "_id": 1,
            "fieldAlias": "code",
            "fieldName": "responseCode",
            "fieldType": "dimension"
        }, {
            "_id": 2,
            "fieldAlias": "Number of hits per second",
            "fieldName": "hitsPerSecond",
            "fieldType": "measure"
        }]

    };

    res.send(result);
});


app.get('/viewwatchlist', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/json/watchlist.json'));
});

app.get('/function', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/jsonData/functiondatadisplay.json'))
})

app.use('/', routes);
app.use('/users', users);
app.use('/function', function_router);
app.use('/sideNav', sideNav_router);
app.use('/watchlist', watchlist_router);
app.use('/namespaces',namespace_router);
app.use('/datastream',stream_router)
app.use('/createslide',watchlistslide_router);

app.post('/createNamespacePost', jsonParser, function(request, response) {
    var body1 = request.body;
    alert("reached")
});

app.post('/savewatchlist', jsonParser, function(request, response) {
    var body2 = request.body;
    console.log(body2);
  });
app.get('/viewwatchlist', function(req, res){
  res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/watchlist.json'));
});
app.post('/savewatchlist',jsonParser,function(request,response){
  var body2=request.body;
  console.log(body2);

})
app.post('/sendslidedata', function(request, response) {
    console.log("helo");
    var body1 = request.body;
    console.log("body1 = " + body1);
});

app.get('/viewNamespace', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/namespace.json'));
});
app.get('/fieldOption', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/fieldOption.json'));
});
app.get('/operatorOption', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/operatorOption.json'))
})

app.get('/viewInstance', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/instance.json'));
});

app.get('/viewStreams', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/json/data.json'));
  });
app.get('/OutcomeOptions',function(req,res)
{
res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/outcomeOption.json'));
});
app.get('/viewNamespace', function(req, res){
  res.sendFile(path.join(__dirname,'tattvaclient/design/watchlists/json/namespace.json'));
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


app.get('/functionlist', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/data/functionlist.json'));
});

// app.get('/submitInstance', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public/data/namespace.json'));
//
// app.get('/submitInstance',function(req,res){
//   res.sendFile(path.join(__dirname, 'public/data/namespace.json'));
// });





/*functions*/
app.get('/func_link', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/data/function_data.json'));
});

app.get('/func_link_data', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/data/function_data_display.json'));
}); /*functions*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




/*ui-router*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
