var io = require('../../watchresultio');
var orgSchema = require('../organisation/organisations');
var dataProvider = require('../core/datamodelprovider');
//var moment = require('moment');
var orgModel=dataProvider.getModel(orgSchema, "tattva");
var nspConList = [];

orgModel.find({},function(err,docs) {
    docs.forEach(function(doc) {
        //console.log(doc);
        var nsp = io.of('/'+doc.orgSite);
        nsp.on('connection', function(socket) {
            console.log("notification server connected to ",doc.orgSite);
            socket.on('notification', function(msg) {
               // console.log(moment().startOf(msg[4]).fromNow());
                //var time = moment(msg[4], "YYYYMMDD").fromNow();
                //console.log(msg);
                socket.broadcast.emit('notification', msg);
            })
            socket.on('disconnect', function(socket) {
            console.log("disconnected notification server on ",doc.orgSite);
        });
        });
        
        nspConList.push(nsp);
    })
})
module.exports = {
    nspConList: nspConList
};
