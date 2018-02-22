var path = require("path");

//Links friend arrays
var friends = require("../data/friends.js");
// console.log("Friends are ", friends);

module.exports = function(app){
  //Accesses friend arrays
  app.get('/api/friends', function(req,res){
    res.json(friends);
    console.log("App.get success ", friends); //Responds on /api/friends page
  });

    //Add user input to friend arrays
  app.post('/api/friends', function(req,res){
    //Sets up comparison between user input and friend arrays
    var newFriendScore = req.body.scores;
    console.log("User input scores ", newFriendScore);
    var scoreArr = [];
    var friendCount = 0;
    var topMatch = 0;

    //Go through friend arrays
    for(var i=0; i<friends.length; i++){
      var scoresDiff = 0;
      //Calculate comparison of user's inputs to friend arrays
      for(var x=0; x<newFriendScore.length; x++){
        scoresDiff += (Math.abs(parseFloat(friends[i].scores[x]) - parseFloat(newFriendScore[x])));
      }

      //Push results into score array
      scoreArr.push(scoresDiff);
    }

    //Calculate best friend match
    for(var i=0; i<scoreArr.length; i++){
      if(scoreArr[i] <= scoreArr[topMatch]){
        topMatch = i;
      }
    }

    //Returns topMatch data
    var bestFriend = friends[topMatch];
    res.json(bestFriend);

    //Add user input into the friend arrays
    friends.push(req.body);
  });
};