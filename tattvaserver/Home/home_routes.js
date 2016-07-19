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
  next();
});

// sideNav_router.get('/', function(req, res) {
// //console.log("we reached in the route----------------sideNav_router---------------------------------------------------------------");
//   home.find({},{menu:1,link:1,icon:1,children:1},function (err, sideNavItems) {
//     res.send(sideNavItems);
//   })
// });

sideNav_router.get('/:userRole', function(req, res) {
  var userRole=req.params.userRole;
  if(userRole==="ORGADM"){
    var navItems = {
      topNav: [
        {
          'menu': 'Sign out',
          'link': 'signout'
        }
      ],
      sideNav: [
        {
          "menu" : "Dashboard",
          "link" : "home",
          "icon" : "dashboard",
        },
        {
          "menu" : "Design",
          "link" : "design.summary",
          "icon" : "playlist_add",
          "children" : [
            {
              "menu" : "Namespace",
              "link" : "design.namespace"
            },
            {
              "menu" : "Instance",
              "link" : "design.instance"
            },
            {
              "menu" : "Streams",
              "link" : "design.streams"
            },
            {
              "menu" : "Functions",
              "link" : "design.function"
            },
            {
              "menu" : "Constants",
              "link" : "design.constant"
            },
            {
              "menu" : "Watchlists",
              "link" : "design.watchlist"
            }
          ]
        },
        {
          "menu" : "Organisation",
          "link" : "organisation",
          "icon" : "group"
        },
        {
          "menu" : "Action",
          "link" : "action",
          "icon" : "gavel"
        },
        {
          "menu" : "Notification",
          "link" : "notification",
          "icon" :  "notifications"

        }
      ]
    };
  }
  else if(userRole==="ORGUSER"){
    var navItems = {
      topNav: [
        {
          'menu': 'Sign out',
          'link': 'signout'
        }
      ],
      sideNav: [
        {
          "menu" : "Dashboard",
          "link" : "home",
          "icon" : "dashboard",
        },
        {
          "menu" : "Design",
          "link" : "design.summary",
          "icon" : "playlist_add",
          "children" : [
            {
              "menu" : "Namespace",
              "link" : "design.namespace"
            },
            {
              "menu" : "Instance",
              "link" : "design.instance"
            },
            {
              "menu" : "Streams",
              "link" : "design.streams"
            },
            {
              "menu" : "Functions",
              "link" : "design.function"
            },
            {
              "menu" : "Constants",
              "link" : "design.constant"
            },
            {
              "menu" : "Watchlists",
              "link" : "design.watchlist"
            }
          ]
        },
        {
          "menu" : "Action",
          "link" : "action",
          "icon" : "gavel"
        },
        {
          "menu" : "Notification",
          "link" : "notification",
          "icon" :  "notifications"

        }
      ]
    };
  }
  else if(userRole==="TATTVAADM"){
    var navItems = {
      topNav: [
        {
          'menu': 'Sign out',
          'link': 'signout'
        }
      ],
      sideNav: [
        {
          "menu"  : "Admin Dashboard",
          "link"  : "adminHome",
          "icon"  :  "dashboard",
        },
        {
          "menu"  : "Processor Control Panel",
          "link"  : "processorControlPanel",
          "icon"  : "memory"
        }
      ]
    };
  } else{
    //Assuming role as guest
    var navItems = {
      topNav: [{'link': 'signin',
      'menu': 'Sign in'}],
      sideNav: []
    };
  }
  return res.status(200).json(navItems);
});

module.exports = sideNav_router;
