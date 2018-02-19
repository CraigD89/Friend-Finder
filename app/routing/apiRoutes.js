var path = require("path");

//Links friend arrays
var friends = require("../data/friends.js");

module.exports = function(app) {
  
  //Accesses friend arrays
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


};
