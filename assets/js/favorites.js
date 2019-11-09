// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMQ0avqtA8a0J4p6jr0Qwol7oAg9jv45I",
    authDomain: "scene-it-3f5e8.firebaseapp.com",
    databaseURL: "https://scene-it-3f5e8.firebaseio.com",
    projectId: "scene-it-3f5e8",
    storageBucket: "scene-it-3f5e8.appspot.com",
    messagingSenderId: "844424365394",
    appId: "1:844424365394:web:9c430cb2816322066a268b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


let favSearchResponse;
let favTitle = "";
let favPoster = "";
let rating = 0;
let favPosterLink = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

// Capture Button Click
$("#add-favorite").on("click", function (event) {
    
    // Don't refresh the page!
    event.preventDefault();

    // Begin API Query
    const favInput = $("#fav-input").val().trim();
    console.log(favInput);

    //Defines API query URL
    const queryURL = "https://api.themoviedb.org/3/search/movie?api_key=33d4301a92067b28681045ddd01c67ad&query=" + favInput;

    //Ajax get request to query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        //After data from ajax get comes back
        .then(function (fav) {
            favSearchResponse = fav.results;
            console.log(fav.results);

            favTitle = favSearchResponse[0].title;
            favPoster = favSearchResponse[0].poster_path;
            rating = favSearchResponse[0].vote_average;

            console.log(favTitle);

            database.ref().push({
                title: favTitle,
                poster: favPoster,
                movieRating: rating
            });

        });
    console.log("test");
    $("#fav-input").val("");

})

// Code in the logic for storing and retrieving the most recent user.
console.log("database");

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (snapshot) {

    let movieCard = $("<div>");
    movieCard.attr("class", "card fav-card col-sm-2 col-md-2 col-lg-2 animated delay-1s fadeIn");

    let cardRow = $("<div>");
    cardRow.attr("class", "row fav-row");

    let cardImageContainer = $("<div>");
    cardImageContainer.attr("class", "col-sm-12 col-md-12 col-lg-12 fav-img-container");

    let cardImage = $("<img>");
    cardImage.attr("class", "fav-poster img-fluid ");
    cardImage.attr("src", favPosterLink + snapshot.val().poster);

    let cardBodyContainer = $("<div>");
    cardBodyContainer.attr("class", "fav-card-body-container col-sm-12 col-md-12 col-lg-12");

    let cardBody = $("<div>")
    cardBody.attr("class", "fav-card-body");
    cardBody.append("<h4>" + snapshot.val().title + "</h4>");
    cardBody.append("<p>Average Rating: " + snapshot.val().movieRating + "</p>");

    movieCard.append(cardRow);
    cardRow.append(cardImageContainer);
    cardImageContainer.append(cardImage);
    cardRow.append(cardBodyContainer);
    cardBodyContainer.append(cardBody);

    $("#user-favorites").append(movieCard);
