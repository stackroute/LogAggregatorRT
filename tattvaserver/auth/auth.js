var passport = require('passport');
var flash    = require('connect-flash');
var LocalStrategy   = require('passport-local').Strategy;
var User = require("../organisation/users");
var Organisation = require("../organisation/organisations");
var mongoose = require('mongoose');

module.exports = function(app, passport) {

  //Overriding the default passport's way of redirecting, instead sending back a JSON object with appropriate HTTP status cpde
  app.post('/signin', function(req, res, next) {
    console.log("request created  is",req.body);
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Please retry with valid credentials input..!'
      });
    }

    //This way of calling will avoid redirection to a success and failure URLs separately
    passport.authenticate('local-signin', function(err, user, info) {
      console.log("The user is ",user);
      if (err) {
        console.log("error is found ",err);
        return res.status(500).json(err);
      }

      if (user) {
        //You can put your additional code if you want to do something here, like enhancing user object with more data etc.,
        console.log("successful user is",user);
        return res.status(200).json(user);
      } else {
        console.log("the error info is",info);
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.get("/signout",function(req, res) {
    req.logout();
    res.status(200).json();
  });

  //When a Org Admin adds a new user
  app.post("/orguser", function(req, res){
    //Logic pending
    //This does not do any authentication, only creates a new user object
    var newUser = new User({
      "name" : req.body.name,
      "email" : req.body.email,
      "password" : req.body.password,
      "orgsite" : req.body.orgsite,
      "role" : "User"
    });
    newUser.save(function(err,newUser){
      if(err) {
          return res.status(401).json(err);
      }
    });
  });

  app.post('/signup', function(req, res, next) {
    if (!req.body.orgname
      || !req.body.orgsite
      || !req.body.orglocation
      || !req.body.name
      || !req.body.email
      || !req.body.password) {
      return res.status(400).json({
        message: 'Please retry with valid credentials input..!'
      });
    }

    //We are not using passport's local signup, instead overriding it to manually create signup Documents(objects, which are organisation and user in our case)
    //Doing this way of gives flexibility to either auto authenticate the user on signup or prompt the user to signin explicitly after registration or signup
    //This will help for scenarios where we need to do the email verification before allowing user to use the app

    //Check if the organisation site already exists? (orgsite & email)
    //Check if the user already exists? (email)

    //Create the Organisation
    var newOrg = new Organisation({
      "orgName": req.body.orgname,
      "orgSite": req.body.orgsite,
      "orgLocation" : req.body.orglocation,
      "contactName" : req.body.name,
      "contactEmail": req.body.email
    });

    newOrg.save(function(err, orgObj) {
      if(err) {
        console.log("Error in new org creation:" , err);
          return res.status(401).json(err);
      }

      //Create the User and attach him to the organisation just created as a Admin
      var newUser = new User({
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : req.body.password,
        "orgsite" : req.body.orgsite,
        "role" : "ORGADM"
      });

      newUser.save(function(err, savedUser){
        if(err) {
          console.log("Error in new org admin user creation:" , err);
            return res.status(401).json(err);
        }

        //Now authenticate the user for login
        passport.authenticate('local-signin', function(err, user, info) {
          if (err) {
            console.log("Error in user authenticate:" , err);
            return res.status(500).json(err);
          }

          if (user) {
            console.log("Successfully authenticated user: ", user);
            //You can put your additional code if you want to do something here, like enhancing user object with more data etc.,
            return res.status(200).json(user);
          } else {
            console.log("unauthorized signin attempt \nerror:", err, "\nInfo:", info);
            return res.status(401).json(info);
          }
        })(req, res, next);
      })
    });
  });

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    else {
      res.redirect('/');
    }
  };

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err,user) {
      if(err) {
        console.log("Error in finding user for deserialize ", err);
      }
      done(err, user);
    });
  });

  passport.use('local-signin',
  new LocalStrategy({usernameField : 'email',passwordField : 'password',passReqToCallback : true },
  function(req, email, password,done) {
    console.log("Finding user by email: ", email);
    User.findOne({ 'email' :  email }, function(err, user) {
      if (err){
        console.log("Error in finding user: ", err, " User: ", email);
        return done(err);
      }
      if (!user){
        return done(null, false, {message: 'Invalid user credentials, please retry with valid credentials..!'});
      }

      if (!user.validPassword(password)){
        return done(null, false, {message: 'Invalid user credentials, please retry with valid credentials..!'});
      }

      //IF SUCCESSFUL LOGIN, I.E., USER FOUND AND PASSWORD MATCHES
      return done(null, user);
    });
  }));

}//end of module
