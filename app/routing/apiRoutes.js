var path = require("path");

//Links friend arrays
var friends = require("../data/friends.js");
    // console.log("Friends are ", friends);

module.exports = function(app) {
  
  //Accesses friend arrays
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //Add user input to friend arrays
  app.post("/api/friends", function (req, res){
    //Takes in user's input as object
    var input = req.body;
    var inputScore = input.scores;

    //Calculate match
    var matchName = "";
    var matchImage = "";
    var totalDifference = 0;

    //Go through friend array
    for (var i = 0; i < friends.length; i++) {

      //Compare to friend arrays
      var difference = 0
      for (var k = 0; k < inputScore.length; k++) {
				difference += Math.abs(friends[i].scores[k] - inputScore[k]);
      }
      
      //Determine match based on lowest difference
      if (difference < totalDifference){
        totalDifference = difference;
				matchName = friends[i].name;
				matchImage = friends[i].imageURL;
      }
    };
  
  });

};
