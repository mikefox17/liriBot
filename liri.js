require("dotenv").config();
//OH SO MANY VAR's
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");
//VAR's for user action and inputs
var input = process.argv;
var action = input[2];
var inputs = input[3];
//Switches for user actions
switch (action) {
  case "spotify-this-song":
    spotify(inputs);
    break;

  case "movie-this":
    movie(inputs);
    break;

  case "concert-this":
    concert(inputs);
    break;

  case "do-what-it-says":
    doIt(inputs);
    break;
}
//OMDB API CALL
function movie(inputs) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    // if (!inputs) {
    //   inputs = "Mr Nobody";
    // }
    //Shorthand for console logging the results
    var results = JSON.parse(body);
    //If no error than results are displayed
    if (!error && response.statusCode === 200) {
      console.log("Title: " + results.Title);
      console.log("Release Year: " + results.Year);
      console.log("IMDB Rating: " + results.imdbRating);
      console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
      console.log("Country: " + results.Country);
      console.log("Language: " + results.Language);
      console.log("Plot: " + results.Plot);
      console.log("Actors: " + results.Actors);
    }
  });
}
//Concert API call
function concert(inputs) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    inputs +
    "/events?app_id=codingbootcamp";

  request(queryUrl, function(error, response, body) {
    if (!inputs) {
      inputs = "Not today, Jack";
    }
    //Shorthand for console logging results
    var result = JSON.parse(body)[0];
    if (!error && response.statusCode === 200) {
      console.log("City: " + result.venue.city);
      console.log("Venue Name: " + result.venue.name);
      //moment.js for formatting the date
      console.log(
        "Date of Event: " + moment(result.datetime).format("MM/DD/YYYY")
      );
    }
  });
}
//Function to read the random.txt file
function doIt(inputs) {
  fs.readFile("random.txt", "utf-8", function(err, buf) {
    console.log(buf.toString());
  });
}
