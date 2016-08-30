angular.module("tattva")
.factory('AuthService', function($http,$q,$window) {
  var auth = { user: undefined };

  auth.saveUser = function(user) {
    if(user !== undefined) {
      if(user.email) {
        //@TODO set a expiry time stamp user.sessionTime = Date.now() + 2 minutes??
        $window.localStorage['member-user'] = JSON.stringify(user);
      } else {
        console.log("Invalid user data for auth: ", user);
        auth.removeUser();
      }
    } else {
      console.log("Undefined user data for auth: ", user);
      auth.removeUser();
    }
  };

  auth.removeUser = function() {
    $window.localStorage.removeItem('member-user');
    //Commenting this line, as this may refresh the view/page, which is against SPA style
    //$window.location.reload();
  };

  auth.getUser = function() {
    var u = $window.localStorage['member-user'];
    if (u !== undefined)
    u = JSON.parse(u);
    return u;
  };

  auth.getGuest = function() {
    var guest = {};
    return guest;
  };

  auth.isMember = function() {
    var user = auth.getUser();

    if (user === undefined) {
      return false;
    } else {
      //@TODO check expiry timestamp on user session object
      return true;
    }
  };

  auth.getCurrentUser = function() {
    if (auth.isMember()) {
      return auth.getUser();
    } else {
      return auth.getGuest();
    }
  };

  auth.getUserNavItem = function() {
    var url = "";
    if (auth.isMember()) {
      url = '/sideNav/' + auth.getUser().role;
    } else {
      url = '/guest';
    }

    return $http.get(url).then(function(res) {
      data =  res.data;
      return data;
    }, function(res) {
      console.log("Error in completing the request: ", res);
      return undefined;
    });
  };

auth.signIn = function(signinFormData) {
  //Returning a promise object
  return $q(function(resolve, reject) {
    $http.post('/signin', signinFormData)
    .then(function(res) {
      //success
      if (res.status >= 400) {
        //can be unauthorized and hence error
        auth.removeUser(); //ensuring user is not saved locally
        reject(res.data);
      } else if (res.status >= 200 && res.status <= 299) {
        if(res.data.user && res.data.token ) {
          res.data.user.token = res.data.token;
          //Successfully authenticated
          auth.saveUser(res.data.user);
          //console.log("response",res.data.token);
          resolve(auth.getCurrentUser());
        } else {
          //Login request passed but required data was not returned
          auth.removeUser();
          reject(res.data);
        }
      }
    },
    function(res) {
      //error
      //console.log("Sign-in returned with error status: ", res.status, ", Error: ", res.data);
      reject(res.data);
    }
  );
});
};

auth.signout = function() {
  //As a first step invalidate or destroy the local user object
  auth.removeUser();
  //Returning promise object
  return $q(function(resolve, reject) {
    $http
    .get('/signout')
    .then(function(res) {
      //success
      resolve("Signed-out successfully..!");
      // resolve(res.data)
    }, function(res) {
      //error
      reject(res.data);
    }
  );
});
};

auth.signUp = function(signupFormData) {
  //As a first step invalidate or destroy the local user object
  auth.removeUser();

  //Returning a promise object
  return $q(function(resolve, reject) {
    $http.post('/signup', signupFormData)
    .then(function(res) {
      //success
      if (res.status >= 400) {
        console.log("error in signup ", res.data);
        //can be unauthorized and hence error
        auth.removeUser(); //ensuring user is not saved locally
        reject(res.data);
      } else if (res.status >= 200 && res.status <= 299) {
        if(res.data.user && res.data.token ) {
          res.data.user.token = res.data.token;
          //Successfully authenticated
          auth.saveUser(res.data.user);
          //console.log("response",res.data.token);
          resolve(auth.getCurrentUser());
        } else {
          //Signup request passed but required data was not returned
          auth.removeUser();
          reject(res.data);
        }
        //Successfully authenticated
        // console.log("Successfull signup of user: ", res.data);
        // auth.saveUser(res.data);
        // resolve(auth.getCurrentUser());
      }
    },
    function(res) {
      //error
      console.log("Sign-up returned with error status: ", res.status, ", Error: ", res.data);
      reject(res.data);
    }
  );
});
};

 //console.log(auth);
return auth;
});
