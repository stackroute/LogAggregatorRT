var jwt = require('jsonwebtoken');

var UserModel = require("../organisation/users");
var OrganisationsModel = require("../organisation/organisations");
var WatchSlideModel = require("../watchslide/watchslide");

module.exports = function isAuthenticated(req, res, next) {
  //console.log("checking for Authentication");

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    console.log("Token not found for authentication validation....!");
    res.status(403).json({
      error: 'Invalid user request or unauthorised request..!'
    });
    return;
  }
  var secretOrPrivateKey = 'tattvasecretishere';

  jwt.verify(token, secretOrPrivateKey, function(err, payload) {
    if (err) {
      console.error("Error in decoding token: ", err);
      res.status(403).json({
        error: 'Forbidden, Unauthorised request..!'
      });
      return;
    }

    console.log("Decoded payload: ", payload);

    if (payload) {
      UserModel.findOne({
        email: payload.email
      },
      {
        _id: 0,
        __v: 0
      },
      function(err, user) {
        if (err) {
          console.error("Error in finding user for authentication, error: ", err);
          res.status(403).json({
            error: 'Forbidden, Unauthorised request..!'
          });
          return;
        }

        if (!user) {
          console.error("User not found for authentication, error: ", err, " user: ", user);
          res.status(403).json({
            error: 'Forbidden, Unauthorised request..Not finding user!'
          });
          return;
        }

        req.user = user;
        next();
      }); //end of finding user
    }
  }); //end of verify
}
