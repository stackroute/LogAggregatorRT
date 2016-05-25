/*
Slide Factory or Slide Service is responsible for all CRUD operation on Slides of a User

Provides method to get, create, list, search slides of a specific user, because slides always belong to a user
*/
angular.module('tattva')
.factory('slideFactory', ['$http', function($http) {
  var factory = {
    //This is only for mocking,
    userColln: [
      {"username": "swagat",    "defaultSlide": "abc", "myslides": [{"slideName" : "abc","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr1","watchlists" : [{"id" : "2"},{"id" : "3"},{"id" : "4"}]}]},
      {"username": "pooja",     "defaultSlide": "xyz", "myslides": [{"slideName" : "xyz","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr2","watchlists" : [{"id" : "3"},{"id" : "5"},{"id" : "6"}]}]},
      {"username": "prarthana", "defaultSlide": "jkl", "myslides": [{"slideName" : "jkl","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr3","watchlists" : [{"id" : "2"},{"id" : "3"},{"id" : "4"}]}]},
      {"username": "surya",     "defaultSlide": "mno", "myslides": [{"slideName" : "mno","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr4","watchlists" : [{"id" : "2"},{"id" : "3"},{"id" : "4"}]}]},
      {"username": "rahul",     "defaultSlide": "wxy", "myslides": [{"slideName" : "wxy","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr5","watchlists" : [{"id" : "2"},{"id" : "3"},{"id" : "4"}]}]},
      {"username": "jasjeet",   "defaultSlide": "pqr6", "myslides": [{"slideName" : "rst","watchlists" : [{"id" : "1"},{"id" : "2"}]},{"slideName" : "pqr6","watchlists" : [{"id" : "2"},{"id" : "3"},{"id" : "4"},{"id" : "5"},{"id" : "6"}]}]}
    ],

wldata:[],

    //@TODO This is a internal method, have to be removed later, becouse server will do this
    getUserObj: function(username) {
      for(i = 0; i < factory.userColln.length; i++) {
        var userObj = factory.userColln[i];
        if (userObj.username == username) {
          // console.log(userObj);
          return userObj;
        }
      }
    },

    getSlide: function(username, slideName) {
      // console.log("SlideFactory::getSlide called ", username, ",", slideName);
      var userObj = factory.getUserObj(username);

      for (i = 0; i < userObj.myslides.length; i++) {
        // console.log("iterating for user: ", username, " slide: ", userObj.myslides[i].slideName);
        if (userObj.myslides[i].slideName == slideName) {
          // console.log("returning: ", userObj.myslides[i]);
          return userObj.myslides[i];
        }
      }
    },
    getwldata: function(username, slideName) {
      var userObj = factory.getUserObj(username);
      for (i = 0; i < userObj.myslides.length; i++) {
        if (userObj.myslides[i].slideName == slideName) {
          return userObj.myslides[i].watchlists;
        }
      }
    },

    getDefaultSlide: function(username) {
      var userObj = factory.getUserObj(username);

      return factory.getSlide(username, userObj.defaultSlide);
    },

    //@TODO check if really organisation has to be parameter,
    //becouse server should automatically detect the organisation of the user and fetch its slides or watchlists
    getOrganisationSlide: function(username, organisation) {

    },

    //@TODO we may have to get slides in a paginated way later on
    //getAllSlides: function(username, currentPage, slidesPerPage) {
    getAllSlides: function(username) {
      var userObj = factory.getUserObj(username);
      return userObj.myslides;
    },

    addWatchListsToSlide: function(username, whichSlide, whichWatchList) {

    },

    removeWatchListFromSlide: function(username, whichSlide, whichWatchList) {

    },

    //@TODO metdata can be a array having all other required details about the new slide being created
    createNewSlide: function(username, slideName, slideMetaData) {

    },

    renameSlide: function(username, currentName, newName) {

    }

  }//end of factory definition
  return factory;
}]);
