$(document).ready(function () {

  $("#search-button").on("click", function () {

    console.log("Button Clicked!");
    $("#search-results").empty();

    const searchInput = $("#search-input").val().trim();

    console.log(searchInput);

    $("#search-input").val("");
    $("#search-input").attr("placeholder", "Find a movie to watch");

    //sends request to Taste Dive
    const queryURL = "https://tastedive.com/api/similar?info=1&q=" + searchInput + "&key=348832-SceneIt-PVCNCAHY";

    //AJAX grabs the data and then ...
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //this function fires ...
      .then(function (response) {

        console.log(response);

        function tasteDiveMovie() {
          for (let i = 0; i < 4; i++) {
            tasteDiveMovieIndex = Math.floor((Math.random() * 20));

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
            cardBodyContainer.attr("class", "");

            let cardBody = $("<div>");
            cardBody.attr("id", "search-body-" + i);
            cardBody.attr("class", "search-title");
            cardBody.append("<h3><a href=" + response.Similar.Results[tasteDiveMovieIndex].yUrl + " target='_blank' class='search-card'>" + response.Similar.Results[tasteDiveMovieIndex].Name + "</a></h3>");

            movieCard.append(cardRow);
            cardRow.append(cardBodyContainer);
            cardBodyContainer.append(cardBody);

            $("#search-results").append(movieCard);

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
              searchImage.attr("class", "movie-poster");
              searchImage.attr("src", "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + response2.results[0].poster_path);

              searchImageContainer.append(searchImage);
              cardBody.append(searchImageContainer);

              })
          }
        }
        tasteDiveMovie();
      });
  });
})