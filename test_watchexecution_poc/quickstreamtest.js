var highland = require('highland');
var websocket = require('websocket-stream');

var streamToMongo = require('stream-to-mongo');

var wsstream = websocket('ws://172.23.238.253:7070');

var dbStream = streamToMongo({
    db: 'mongodb://localhost:27017/dbstream',
    collection: 'docs'
});

highland(wsstream)
    .map(function(data) {
        data = JSON.parse(data);
        return data[2];
    })
    .map(function(data) {
        return data;
    })
    .pipe(highland(dbStream))
// .each(highland.log);