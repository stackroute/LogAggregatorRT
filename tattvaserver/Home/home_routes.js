var express = require('express');
var sideNav_router = express.Router();

var home = require('./home.js');

sideNav_router.use(function(req, res, next) {
    //console.log("we reached in the middleware--- sideNav_router--------------------------------------------");
    var items = [{
      "_id" : "item1",
      "menu" : "Dashboard",
      "link" : "home",
      "icon" : "dashboard",
    },
    {
      "_id" : "item2",
      "menu" : "Design",
      "link" : "design.summary",
      "icon" : "playlist_add",
      "children" : [
        {
          "_id" : "item2_1",
          "menu" : "Namespace",
          "link" : "design.namespace"
        },
        {
          "_id" : "item2_2",
          "menu" : "Data Sources",
          "link" : "design.instance"
        },
        {
          "_id" : "item2_3",
          "menu" : "Data Streams",
          "link" : "design.streams"
        },
        {
          "_id" : "item2_4",
          "menu" : "Functions",
          "link" : "design.function"
        },
        {
          "_id" : "item2_5",
          "menu" : "Watch Lists",
          "link" : "design.watchlist"
        }
      ]
    },
    {
      "_id" : "item3",
      "menu" : "Organisation",
      "link" : "organisation",
      "icon" : "group"
    },
    {
      "_id" : "item4",
      "menu" : "Action",
      "link" : "action",
      "icon" : "gavel"
    },
    {
      "_id" : "item5",
      "menu" : "Notification",
      "link" : "notification",
      "icon" :  "notifications"

    }];

    home.collection.insert(items,onInsert);

    function onInsert(err, docs) {
        if (err) {
            // //console.log(err);
        } else {
            console.info('%d Sidenav is successfully stored.', docs.length);
        }
      }
    // var item= new home(
      // {
      //   "_id" : "item1",
      //   "menu" : "Dashboard",
      //   "link" : "home",
      //   "icon" : "dashboard",
      // },
      // {
      //   "_id" : "item2",
      //   "menu" : "Design",
      //   "link" : "design.summary",
      //   "icon" : "playlist_add",
      //   "children" : [
      //     {
      //       "_id" : "item2_1",
      //       "menu" : "Namespace",
      //       "link" : "design.namespace"
      //     },
      //     {
      //       "_id" : "item2_2",
      //       "menu" : "Data Sources",
      //       "link" : "design.instance"
      //     },
      //     {
      //       "_id" : "item2_3",
      //       "menu" : "Data Streams",
      //       "link" : "design.streams"
      //     },
      //     {
      //       "_id" : "item2_4",
      //       "menu" : "Functions",
      //       "link" : "design.function"
      //     },
      //     {
      //       "_id" : "item2_5",
      //       "menu" : "Watch Lists",
      //       "link" : "design.watchlist"
      //     }
      //   ]
      // },
      // {
      //   "_id" : "item3",
      //   "menu" : "Organisation",
      //   "link" : "organisation",
      //   "icon" : "group"
      // },
      // {
      //   "_id" : "item4",
      //   "menu" : "Action",
      //   "link" : "action",
      //   "icon" : "gavel"
      // },
      // {
      //   "_id" : "item5",
      //   "menu" : "Notification",
      //   "link" : "notification",
      //   "icon" :  "notifications"
      //
      // });
    // item.save(function (err) {
    //   if (err) {
    //     //console.log(err);
    //     return handleError(err);
    //   }
    // });
    next();
});

sideNav_router.get('/', function(req, res) {
//console.log("we reached in the route----------------sideNav_router---------------------------------------------------------------");
  home.find({},{menu:1,link:1,icon:1,children:1},function (err, sideNavItems) {
    res.send(sideNavItems);
  })
});

module.exports = sideNav_router;
