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

// Capture Button Click
$("#add-favorite").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    console.log("click");

    // Begin API Query
    const favInput = $("#fav-input").val().trim();
    console.log(favInput);
    let moviePosterImg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

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

            favTitle = favSearchResponse[1].title;
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
        
    })
    
    // Code in the logic for storing and retrieving the most recent user.
    console.log("database");
        




// // Firebase watcher + initial loader HINT: .on("value")
// database.ref().on("child_added", function (snapshot) {

//     let movieCard = $("<div>");
//     movieCard.attr("id", "trending-" + i);
//     movieCard.attr("class", "card trend-card col-sm-2 col-md-2 col-lg-2 trending-card animated delay-1s fadeIn");

//     let cardRow = $("<div>");
//     cardRow.attr("id", "card-row-" + i);
//     cardRow.attr("class", "row trending-row");

//     let cardImageContainer = $("<div>");
//     cardImageContainer.attr("id", "card-image-container-" + i);
//     cardImageContainer.attr("class", "col-sm-4 col-md-4 col-lg-4");

//     let cardImage = $("<img>");
//     cardImage.attr("id", "card-image-" + i);
//     cardImage.attr("class", "movie-poster");
//     cardImage.attr("src", moviePosterImg + favSearchResponse[trendingMovieIndex].poster_path);

//     let cardBodyContainer = $("<div>");
//     cardBodyContainer.attr("id", "card-body-container-" + i);
//     cardBodyContainer.attr("class", "col-sm-8 col-md-8 col-lg-8");

//     let cardBody = $("<div>")
//     cardBody.attr("id", "card-body-" + i);
//     cardBody.attr("class", "card-body");
//     cardBody.append("<h6>" + favSearchResponse[trendingMovieIndex].title + "</h6>");
//     // cardBody.append("<p>Average Rating" + favSearchResponse[trendingMovieIndex].vote_average + "</p>");

//     movieCard.append(cardRow);
//     cardRow.append(cardImageContainer);
//     cardImageContainer.append(cardImage);
//     cardRow.append(cardBodyContainer);
//     cardBodyContainer.append(cardBody);

//     $(".user-favorites").append(movieCard);
// })