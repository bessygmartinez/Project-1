//Begins function upon page load
$(document).ready(function () {

  //When search-button is clicked...
  $("#search-button").on("click", function () {

    //empties out the #recommendations and #user-input-title divs
    $("#recommendations").empty();
    $("#user-input-title").empty();

    console.log("Button Clicked!");

    //This variable holds the value of whatever the user enters in the search bar
    const userInput = $("#search-input").val().trim();



    console.log(userInput);

    //clears the search bar after the search-button is clicked
    $("#search-input").val("");

    //sets the placeholder back to "find a movie to watch"
    $("#search-input").attr("placeholder", "Find a movie to watch");

    //sends request to TasteDive with whatever the user entered in the search bar
    const queryURL = "https://tastedive.com/api/similar?info=1&q=" + userInput + "&key=348832-SceneIt-PVCNCAHY&type=movies";

    //AJAX grabs the data and then...
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //this function fires...
      .then(function (response) {

        console.log(response);

        if (response.Similar.Results.length <= 3) {

          $("#user-input-title").empty();

          $('#no-matches-modal').modal({
            show:true
          })

          // console.log("Sorry! No Matches!")
          // let noMatches = $("#recommendations");
          // noMatches.attr("class", "row");
          // noMatches.text("Sorry! No matches found. Please try another movie.");
          // $("#recommendations").append(noMatches);
        }

        function tasteDiveMovie() {

          //Variable to hold the indexes of the movies chosen
          let recommendationIndexes = [];

          //For loop to choose 4 random movies from the response we get back from TasteDive
          for (let i = 0; i < 4; i++) {

            //Sets if chosen movie is uniqie (has not been chosen already)
            let uniqueMovieIndex = false;

            //Checks if movie chosen is already on chosen list
            //If movie was already chosen choose new movie and check again
            while (!uniqueMovieIndex) {
              tasteDiveMovieIndex = Math.floor((Math.random() * 20));

              //if movie was not already chosen, it is unique, continue with generating card.
              if (!recommendationIndexes.includes(tasteDiveMovieIndex)) {
                uniqueMovieIndex = true;
              }

            }
            recommendationIndexes.push(tasteDiveMovieIndex);

            let movieRecommendation = response.Similar.Results[tasteDiveMovieIndex].Name;
            console.log(movieRecommendation);

            let movieCard = $("<div>");
            movieCard.attr("id", "searchresult-" + i);
            movieCard.attr("class", "card col-sm-2 col-md-2 col-lg-2 search-card animated delay-1s fadeIn");

            let cardRow = $("<div>");
            cardRow.attr("id", "search-row-" + i);
            cardRow.attr("class", "card-row");

            let cardBodyContainer = $("<div>");
            cardBodyContainer.attr("id", "search-body-container-" + i);

            let cardBody = $("<div>");
            cardBody.attr("id", "search-body-" + i);
            cardBody.attr("class", "search-title");
            cardBody.append("<a href=" + response.Similar.Results[tasteDiveMovieIndex].yUrl + " target='_blank' class='search-card'>" + response.Similar.Results[tasteDiveMovieIndex].Name + "</a>");

            movieCard.append(cardRow);
            cardRow.append(cardBodyContainer);
            cardBodyContainer.append(cardBody);

            $("#recommendations").append(movieCard);

            const queryURL2 = "https://api.themoviedb.org/3/search/movie?api_key=33d4301a92067b28681045ddd01c67ad&language=en-US&query=" + response.Similar.Results[tasteDiveMovieIndex].Name + "&page=1&include_adult=false";

            //AJAX grabs the data and then ...
            $.ajax({
              url: queryURL2,
              method: "GET"
            })

              //this function fires ...
              .then(function (response2) {
                console.log(response2);

                let searchImageContainer = $("<div>");
                searchImageContainer.attr("id", "search-img-container-" + i);

                let searchImage = $("<img>");
                searchImage.attr("id", "card-image-" + i);
                searchImage.attr("class", "search-movie-poster img-fluid");
                searchImage.attr("src", "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + response2.results[0].poster_path);

                searchImageContainer.append(searchImage);
                cardBody.append(searchImageContainer);

              })
          }
          let userInputTitle = $("#user-input-title");
          userInputTitle.attr("class", "row");
          userInputTitle.append("Movies like " + userInput + ":");
          $("#search-results").append(userInputTitle);
        }
        tasteDiveMovie();
      });
  });
})