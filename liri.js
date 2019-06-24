
// require installed packages
require('dotenv').config()

var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');


var operator = process.argv[2]
var title = process.argv[3]
var artist = process.argv[4]



// omdb movie query fx
    if(operator === "movie"){
        axios.get("http://www.omdbapi.com/?t="+ title +"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            // console.log(response);
            console.log("The movie was released: " + response.data.Year);
            console.log("The movie's rating is: " + response.data.imdbRating);
            logThis("Title: " + response.data.Title +" " + '\n');
            logThis("Year Released: " + response.data.Year +" " + '\n');
            logThis("IMDB rating: " + response.data.imdbRating +" " + '\n');
            logThis("Plot: " + response.data.Plot +" " + '\n');
            logThis("Cast: " + response.data.Actors +" " + '\n');
        })
    };
    //spotify query fx
    if(operator === "music"){
        var spotify = new Spotify({
            id:"549e8ddcfc244dbbbcf666d4532acec5",
            secret:"38e061ee88e74b499183a9a1cbc4fa6c"
        });
        spotify.search({type: "track", query: title}, function(err, data) {
            if (err) {
                logThis(err);
            }
            var userSong = data.tracks.items;
            console.log("Artist: " + userSong[0].artists[0].name)
            logThis("Artist: " + userSong[0].artists[0].name+" " + '\n');
            logThis("Song Name: " + userSong[0].name+" " + '\n');
            logThis("Preview Link: " + userSong[0].preview_url+" " + '\n');
            logThis("Album: " + userSong[0].album.name+" " + '\n');
        });
                
    };

    if(operator === "concert"){
        axios.get("https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {

            var dateFormat = moment(response.data[0].datetime).format("L");

            console.log('Bands In Town Information: \n');

            logThis("Venue Name: "+ response.data[i].venue.name);
            logThis("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            logThis("Date of the Event: " + moment(response.data[i].datetime).format("L"));
        }
    });

    }

    function logThis (logQuery) {

        console.log(logQuery);
    
        fs.appendFile("SearchAndResultLog.txt", logQuery, function(err) {
            if (err) {
                return logThis("Error: " + err);
            }
        });
    };