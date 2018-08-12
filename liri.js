require("dotenv").config();
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var action = process.argv[2]

switch (action) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      mySpotify();
      break;
    case "movie-this":
      myMovie();
      break;
    case "do-what-it-says":
      doWhat();
      break;
    default: 
    console.log("Choose one of the following:");
    console.log("my-tweets, spotify-this-song, movie-this, do-what-it-says");
      break;
  }
  

function myTweets(){
    var client = twitter({
        consumer_key: 'wsR40tsmQaur7QWY7dKTQ',
        consumer_secret: 'kfrIBUOhFszS0Fvv5HFauVghAInNEjqnewzqYORyg',
        access_token_key: '38839013-RTuzKHhvcU5kwn50kaNlt2CHET7LMwLq9SuF3bChg',
        access_token_secret: 'VdWneBHvKO1mHHCdOp3dHxzzvwFBu9R7q7PHmJLaNQvLV'
      });
	var params = {screen_name: 'arnoldbrook', count: 3, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {

					for(i=0; i<tweets.length; i++){
						console.log(tweets[i].text);
					}
				}
				else{
					console.log(error);
				}
	});

}
//kept saying could not define items
function mySpotify(){
    var spotify = new spotify(keys.spotifyKeys);
    var search = ' ';
    spotify.search({ type: 'track', search }, function(err, data) {
        if (err){
            console.log(err);
        }
        else {
            var songInfo = data.tracks.items;
            console.log("Artist: " + songInfo[0].artists[0].name);
            console.log("Song name: " + songInfo[0].name);
            console.log("Link: " + songInfo[0].preview_url);
            console.log("Album " + songInfo[0].album.name);
        };
    });
}

function myMovie() {
    var title = process.argv[3]
	var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=9725ab47";

	request(queryUrl, function(error, response, body) {
		if (!title){
        	title = 'Shame';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(",");
        if (dataArr[0] === "my-tweets") {
            myTweets();
        } else if (dataArr[0] === "spotify-this-song") {
            mySpotify();
        } else if (dataArr[0] === "movie-this") {
            myMovie();
        }
    });
};

