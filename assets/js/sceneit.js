//Begins function upon page load
$(document).ready(function () {
    let trendingMovieIndex = 0;
    let apiResponse;
    let moviePosterImg = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"

    //Defines API query URL
    const queryURL = "https://api.themoviedb.org/3/trending/movie/week?api_key=33d4301a92067b28681045ddd01c67ad";

    //Ajax get request to query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        //After data from ajax get comes back
        .then(function (response) {
            apiResponse = response.results;

            function trendingMovies() {
                $("#recommended").text("");

                for (let i = 0; i < 4; i++) {

                    trendingMovieIndex = Math.floor(Math.random() * 20);
                    console.log("test");
                    console.log(trendingMovieIndex);
                    console.log(apiResponse[trendingMovieIndex]);

                    let movieCard = $("<div>");
                    movieCard.attr("id", "recommendation-" + i);
                    movieCard.attr("class", "card col-sm-2 col-md-2 col-lg-2 recommendation-card animated delay-1s fadeIn");

                    let cardRow = $("<div>");
                    cardRow.attr("id", "card-row-" + i);
                    cardRow.attr("class", "row");

                    let cardImageContainer = $("<div>");
                    cardImageContainer.attr("id", "card-image-container-" + i);
                    cardImageContainer.attr("class", "col-md-4 col-lg-4");

                    let cardImage = $("<img>");
                    cardImage.attr("id", "card-image-" + i);
                    cardImage.attr("class", "movie-poster");
                    cardImage.attr("src", moviePosterImg + apiResponse[trendingMovieIndex].poster_path);

                    let cardBodyContainer = $("<div>");
                    cardBodyContainer.attr("id", "card-body-container-" + i);
                    cardBodyContainer.attr("class", "col-md-8 col-lg-8");

                    let cardBody = $("<div>")
                    cardBody.attr("id", "card-body-" + i);
                    cardBody.attr("class", "card-body");
                    cardBody.append("<h6>" + apiResponse[trendingMovieIndex].title + "</h6>");

                    movieCard.append(cardRow);
                    cardRow.append(cardImageContainer);
                    cardImageContainer.append(cardImage);
                    cardRow.append(cardBodyContainer);
                    cardBodyContainer.append(cardBody);

                    $("#recommended").append(movieCard);
                }
            }
            trendingMovies()
            setInterval( function(){trendingMovies()}, 10000);
        })
})