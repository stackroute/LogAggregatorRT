var jwt = require('jsonwebtoken');

var UserModel = require("../organisation/users");
var OrganisationsModel = require("../organisation/organisations");
var WatchSlideModel = require("../watchslide/watchslide");

module.exports = function(app) {
  app.post('/signup', function(req, res, next) {

    if (!req.body.orgname || !req.body.orgsite || !req.body.orglogo || !req.body.orglocation || !req.body.name || !req.body.email || !req.body.password)
    {
      return res.status(400).json({
        message: 'Provide valid credentials...!'
      });
    }

    //Create the organisation
    var newOrganisation = new OrganisationsModel({
      "orgName": req.body.orgname,
      "orgSite": req.body.orgsite,
      "orgLogo": req.body.orglogo,
      "orgLocation": req.body.orglocation,
      "contactName": req.body.name,
      "contactEmail": req.body.email
    });
    //console.log("body:" ,req.body);
    //Save the organisation
    var user = newOrganisation.save(function(err,orgObj) {
      if(err){

        console.log("Error in new org creation:", err);
        var err=new Error("Invalid Input....!");
        err.status=401;
        throw err;
      }

      //After organisation is created User is created
      var newUser = new UserModel({
        "name":req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "orgsite": req.body.orgsite,
        "role":'ORGADM'
      });

      //Save the user of that organisation
      newUser.save(function(err,userObj){
        if(err){
          return res.status(401).json(err);
        }

        //After user is created, add a default watchslide
        var userDefaultSlide = new WatchSlideModel({
          "username": userObj.email,
          "orgname": userObj.orgsite,
          "defaultSlide": 'org',
          "mySlides": []
        });

        userDefaultSlide.save(function(err, savedSlide) {
          if (err) {
            // console.log("Error in saving default slide details for user", err);
            return res.status(401).json(err);
          }

          OrganisationsModel.findOne({
            'orgSite': userObj.orgsite
          }, function(err, org) {
            if (err) {
              console.log("Error in finding organisation of the user: ", err, " User: ", email, " org: ", userObj.orgsite);
              return done(err);
            }

            if (!org) {
              return done(null, false, {
                message: 'Invalid user credentials, please retry with valid credentials..!'
              });
            }

            var sessionUserUp = {
              "name": userObj.name,
              "email": userObj.email,
              "orgsite": userObj.orgsite,
              "role": userObj.role,
              "orgName": orgObj.orgName,
              "orgLogo": orgObj.orgLogo,
              "orgLocation": orgObj.orgLocation
            };

            //IF SUCCESSFUL LOGIN, I.E., USER FOUND AND PASSWORD MATCHES
            // return done(null, sessionUser);
            generateJWTToken(req,res,sessionUserUp);//generate JWTToken
          });

        });
      });
    });

  });

  app.post('/signin', function(req,res,next) {
    if (!req.body.email || !req.body.password) {
      res.json({
        error: "Please try with valid credentials..!"
      });
      return;
    }
    UserModel.findOne({
      email: req.body.email
    }, {
      _id: 0,
      __v: 0
    },
    function(err, user) {

      if (err) {
        logger.error("Database error in finding user, error: ", err);
        res.status(500).json({
          error: "Failed to process request, please try later..!"
        });
        return;
      }

      if (!user) {
        console.error('User ', req.body.email, ' not found..!');
        res.status(403).json({
          error: "Invalid credentials...!"
        });
        return;
      }

      if (!user.validPassword(req.body.password)) {
        res.status(403).json({
          error: "Invalid credentials password...!"
        });
        return;
      }

      OrganisationsModel.findOne({
        'orgSite': user.orgsite
      }, function(err, org) {
        if (err) {
          console.log("Error in finding organisation of the user: ", err, " User: ", email, " org: ", user.orgsite);
          return done(err);
        }

        if (!org) {
          return done(null, false, {
            message: 'Invalid user credentials, please retry with valid credentials..!'
          });
        }

        var sessionUser = {
          "name": user.name,
          "email": user.email,
          "orgsite": user.orgsite,
          "role": user.role,
          "orgName": org.orgName,
          "orgLogo": org.orgLogo,
          "orgLocation": org.orgLocation
        };

        //IF SUCCESSFUL LOGIN, I.E., USER FOUND AND PASSWORD MATCHES
        // return done(null, sessionUser);
        generateJWTToken(req,res,sessionUser); //generate JWTToken
      });


    }); //end of user find query

  });

  function generateJWTToken(req,res,user){
    var payload = {
      email: user.email,
      org: user.orgsite,
      role: user.role
    };
    var secretOrPrivateKey = 'tattvasecretishere';
    var options = {
      algorithm: "HS256",
      expiresIn: 3600,
      issuer: user.email
    };
    console.log("payload:" ,payload);

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
      if (err) {
        //console.log("payload in sign:" ,payload);
        //logger.error("Error in generating auth token, error: ", err);
        res.status(500).json({
          error: "Internal error in processing request, please retry later..!"
        });
      }

      if(!jwtToken) {
        console.error("Empty token generated...!");
        // var err = new Error("Internal error in processing request, please retry later..!");
        // err.status=401;
        // throw err;
      }

      res.status(201).json({
        'user': user,
        'token': jwtToken
      });
      return;
    });
  }
}
