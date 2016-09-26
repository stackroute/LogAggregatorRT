var io = require('../../watchresultio');
var orgSchema = require('../organisation/organisations');
var dataProvider = require('../core/datamodelprovider');
var orgModel=dataProvider.getModel(orgSchema, "tattva");
var nspConList = [];

orgModel.find({},function(err,docs) {
    docs.forEach(function(doc) {
        var nsp = io.of('/'+doc.orgSite);
        nsp.on('connection', function(socket) {
            console.log("Notification server connected to ",doc.orgSite);
            socket.on('notification', function(msg) {
                socket.broadcast.emit('notification', msg);
            })
            socket.on('disconnect', function(socket) {
            console.log("Disconnected notification server on ",doc.orgSite);
        });
        });
        
        nspConList.push(nsp);
    })
})
module.exports = {
    nspConList: nspConList
};
