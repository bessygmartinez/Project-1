$(document).ready(function() {

$("#search-button").on("click", function() {

    console.log("Button Clicked!")

    const searchInput = $("#search-input").val().trim();

    console.log(searchInput);

    //sends request to Taste Dive
    const queryURL = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + searchInput + "&key=348832-SceneIt-BFZ9XXVL";

    //AJAX grabs the data and then ...
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //this function fires ...
      .then(function(response) {

        console.log(response);
      });
  });
})