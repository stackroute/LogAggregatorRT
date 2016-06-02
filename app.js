var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var fs=require("fs");

var jsonParser=bodyParser.json();


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var JSONparser = bodyParser.json();

var jsonParser = bodyParser.json();

//mongoose connection
//Mongoose connection
var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/wipro';
// var dbURI = 'mongodb://172.23.238.253:32769/wipro';
var watchlist_router = require(path.join(__dirname,'/tattvaserver/design/watchlists/watchlist_routes.js'));
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

app.use('/watchlist', watchlist_router);
//end of connection

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_modules')));
app.use(express.static(path.join(__dirname, 'tattvaclient')));
app.use(express.static(path.join(__dirname, 'tattvaserver')));

app.use('/', routes);
app.use('/users', users);

var data1=[];

app.get('/namespaces', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/listnamespace.json'));
});
app.post('/namespaces',jsonParser,function (request, response) {
  var body1=request.body;
  console.log(body1);//in body1 we have the data to be stored in the database
});
app.put('/namespace/',jsonParser,function (request, response) {
  var body1=request.body;
  console.log("body1 put" , body1);//in body1 we have the data to be stored in the database
});
app.get('/namespace/', function(req, res){
  console.log("namespace name from server",req.query.name);

  var data=[
    {
      "name":"apache",
      "description":"This is the data format for namespace apache",
      "dataformat":[
        {
          "fieldAlias":"method",
          "fieldName":"Method name",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"code",
          "fieldName":"response code",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"hitsPerSecond",
          "fieldName":" second",
          "fieldType":"measure"
        }
      ]
    },
    {
      "name":"NGINX",
      "description":"This is the data format for namespace NGINX",
      "dataformat":[
        {
          "fieldAlias":"method",
          "fieldName":"Method name",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"code",
          "fieldName":"response code",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"hitsPerSecond",
          "fieldName":"Number of hits per second",
          "fieldType":"measure"
        }
      ]
    },
    {
      "name":"BOA",
      "description":"This is the data format for namespace BOA",
      "dataformat":[
        {
          "fieldAlias":"method",
          "fieldName":"Method name",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"code",
          "fieldName":"response code",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"hitsPerSecond",
          "fieldName":"Number of hits per second",
          "fieldType":"measure"
        }
      ]
    },
    {
      "name":"IOT",
      "description":"This is the data format for namespace IOT",
      "dataformat":[
        {
          "fieldAlias":"method",
          "fieldName":"Method name",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"code",
          "fieldName":"response code",
          "fieldType":"dimension"
        },
        {
          "fieldAlias":"hitsPerSecond",
          "fieldName":"Number of hits per second",
          "fieldType":"measure"
        }
      ]
    },
  ];

  var result =    {"_id":0,
  "name":"apache",
  "description":"This is the data format for namespace apache",
  "organisation":"Wipro",
  "createdBy":"Rahul",
  "editedBy":"user123",
  "archived":"false",
  "dataformat":[
    {"_id":0,
    "fieldAlias":"method",
    "fieldName":"Name",
    "fieldType":"dimension"
  },
  {"_id":1,
  "fieldAlias":"code",
  "fieldName":"responseCode",
  "fieldType":"dimension"
},
{"_id":2,
"fieldAlias":"Number of hits per second",
"fieldName":"hitsPerSecond",
"fieldType":"measure"
}
]

};

res.send(result);
});


app.get('/viewwatchlist', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/watchlist.json'));
});

app.get('/function',function(req,res){
res.sendFile(path.join(__dirname, 'public/jsonData/functiondatadisplay.json'))
})

app.post('/createNamespacePost',jsonParser,function (request, response) {
  var body1=request.body;
  alert("reached")
});

app.post('/savewatchlist',jsonParser,function(request,response){
  var body2=request.body;
  console.log(body2);

})
app.post('/sendslidedata',function (request, response) {
  console.log("helo");
  var body1=request.body;
  console.log("body1 = "+body1);
});
app.get('/OutcomeOptions',function(req,res)
{
res.sendFile(path.join(__dirname, 'tattvaclient/design/watchlists/json/outcomeOption.json'));
});
// app.use('/', routes);
// app.use('/users', users);

// mongo search query for particular username or slidename
// app.get('/user/:username/slides/:slidename', function(req, res){
// mongo.search();
// });
app.get('/viewNamespace', function(req, res){
  res.sendFile(path.join(__dirname,'/public/json/namespace.json'));
});
app.get('/fieldOption',function(req,res){
res.sendFile(path.join(__dirname,'/public/json/fieldOption.json'));
});
app.get('/operatorOption',function(req,res)
{
res.sendFile(path.join(__dirname,'/public/json/operatorOption.json'))
});

app.get('/viewInstance', function(req, res){
  res.sendFile(path.join(__dirname, '/public/json/instance.json'));
});

app.get('/viewStreams', function(req, res){
  res.sendFile(path.join(__dirname, '/public/json/data.json'));
});

app.post('/filewrite', JSONparser, function(req, res){
  var data= req.body;
});


app.post('/publisherData', JSONparser, function(req, res){
  var data= req.body;
  console.log(data);
});

app.get('/org_admin', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/admindata.json'));
});
app.post('/login_reg1',jsonParser,function (request, response) {
  var body1=request.body;
  // console.log(body1);
  //response.send("hi");
});

app.get('/login_reg', function(req, res){
  res.sendFile(path.join(__dirname, 'public/data.json'));
});


app.get('/functionlist',function(req,res){
  res.sendFile(path.join(__dirname, 'public/data/functionlist.json'));
});

app.get('/submitInstance',function(req,res){
  res.sendFile(path.join(__dirname, 'public/data/namespace.json'));
});
app.get('/data/:param',function(req,res){
  var name=req.params.param;
  res.sendFile(path.join(__dirname, 'public/data/'+name+'Instance.json'));
});

app.post('/createdialogInstance',jsonParser,function(req,res){
  var instdata=req.body;

  console.log("Adding new instance to system: ", instdata);

  var arr=[];
  var jsonObj={};
  fs.readFile(path.join(__dirname, 'public/data/instance.json'), function (err, data) {
    if (err) {
      return console.error(err);
    }
    arr=JSON.parse(data);

    for(var i=0;i<arr.length;i++)
    {

      if(arr[i].namespace===instdata.namespace)
      {
        (arr[i].instances).push(instdata.instance);
        break;
      }
    }
    jsonObj=JSON.stringify(arr);
    fs.writeFile(path.join(__dirname,'public/data/instance.json'),jsonObj,function(err){
      if (err) {
        return console.error(err);
      }
      res.sendFile(path.join(__dirname, 'public/data/instance.json'));
    });
  });



});

/*functions*/
app.get('/func_link', function(req, res){
  res.sendFile(path.join(__dirname, 'public/data/function_data.json'));
});

app.get('/func_link_data', function(req, res){
  res.sendFile(path.join(__dirname, 'public/data/function_data_display.json'));
});/*functions*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




/*ui-router*/


app.get('/submitInstance',function(req,res){
  res.sendFile(path.join(__dirname, 'public/data/namespace.json'));
});
app.get('/data/:param',function(req,res){
  var name=req.params.param;
  res.sendFile(path.join(__dirname, 'public/data/'+name+'Instance.json'));
});

app.post('/createdialogInstance',jsonParser,function(req,res){
  var instdata=req.body;

  var arr=[];
  var jsonObj={};
  fs.readFile(path.join(__dirname, 'public/data/instance.json'), function (err, data) {
    if (err) {
      return console.error(err);
    }
    arr=JSON.parse(data);

    for(var i=0;i<arr.length;i++)
    {

      if(arr[i].namespace===instdata.namespace)
      {
        (arr[i].instances).push(instdata.instance);
        break;
      }
    }
    jsonObj=JSON.stringify(arr);
    fs.writeFile(path.join(__dirname,'public/data/instance.json'),jsonObj,function(err){
      if (err) {
        return console.error(err);
      }
      res.sendFile(path.join(__dirname, 'public/data/instance.json'));
    });
  });



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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
