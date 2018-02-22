var path = require("path");

//Links friend arrays
var friends = require("../data/friends.js");
// console.log("Friends are ", friends);

module.exports = function(app) {
  //Accesses friend arrays
  app.get("/api/friends", function(req, res) {
    res.json(friends);
    // console.log("App.get success ", friends);
  });

  //Add user input to friend arrays
  app.post("/api/friends", function(req, res) {

    //Sets up comparison between user input and friend arrays
    var matchScore = req.body.scores;
    var scoreArr = [];
    var bestMatch = 0;

    //Go through friend arrays
    for (var i = 0; i < friends.length; i++) {
      var scoreDifference = 0;
      //Calculate comparison of user's inputs to friend arrays
      for (var x = 0; x < matchScore.length; x++) {
        scoreDifference += Math.abs(parseFloat(friends[i].scores[x]) - parseFloat(matchScore[x]));
      }

      //Push results into score array
      scoreArr.push(scoreDifference);
    }

    //Calculate best friend match
    for (var i = 0; i < scoreArr.length; i++) {
      if (scoreArr[i] <= scoreArr[bestMatch]) {
        bestMatch = i;
      }
    }

    //Returns bestMatch data
    var bestFriend = friends[bestMatch];
    res.json(bestFriend);
  });
};
