var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var fs=require("fs");

var jsonParser=bodyParser.json();


 var routes = require('./routes/index');
 var users = require('./routes/users');

var app = express();

var JSONparser = bodyParser.json();

var jsonParser = bodyParser.json();


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

app.use('/', routes);
app.use('/users', users);

var data1=[];

app.get('/nameSpaceList', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/listnamespace.json'));
});
app.get('/viewwatchlist', function(req, res){
  res.sendFile(path.join(__dirname, 'public/json/watchlist.json'));
});

app.post('/createNamespacePost',jsonParser,function (request, response) {
  var body1=request.body;
  /*console.log("body1 = "+body1);*/
  alert("reached")
});

app.post('/sendslidedata',function (request, response) {
  console.log("helo");
  var body1=request.body;
  console.log("body1 = "+body1);
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

app.get('/viewInstance', function(req, res){
res.sendFile(path.join(__dirname, '/public/json/instance.json'));
});

app.get('/viewStreams', function(req, res){
res.sendFile(path.join(__dirname, '/public/json/data.json'));
});

app.post('/filewrite', JSONparser, function(req, res){
var data= req.body;
/*console.log(data);*/
});
// app.get('/viewNamespace', function(req, res){
// res.sendFile(path.join(__dirname, '/public/json/namespace.json'));
// });

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
