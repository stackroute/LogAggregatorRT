var express = require('express');
var app = express();
var router=require('./controller/controller.js');
app.use('/watchlist', router);
