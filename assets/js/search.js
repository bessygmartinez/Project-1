$(document).ready(function () {

  $("#search-button").on("click", function () {

    console.log("Button Clicked!");
    $("#search-results").empty();

    const searchInput = $("#search-input").val().trim();

    console.log(searchInput);

    $("#search-input").val("");
    $("#search-input").attr("placeholder", "Find a movie to watch");

    //sends request to Taste Dive
    const queryURL = "https://tastedive.com/api/similar?info=1&q=" + searchInput + "&key=348832-SceneIt-3TXB16VH";

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
            movieCard.attr("class", "card card-body search-card");

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
          }
        }

        tasteDiveMovie();
      });
  });
})