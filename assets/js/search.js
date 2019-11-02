$(document).ready(function() {

$("#search-button").on("click", function() {

    console.log("Button Clicked!");

    const searchInput = $("#search-input").val().trim();

    console.log(searchInput);    
    
    $("#search-input").val("");
    $("#search-input").attr("placeholder", "Find a movie to watch");

    //sends request to Taste Dive
    const queryURL = "https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=" + searchInput + "&wTeaser&key=348832-SceneIt-TTUTRLIL";

    //AJAX grabs the data and then ...
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //this function fires ...
      .then(function(response) {

        console.log(response);

       function tasteDiveMovie() {
           for (let i = 0; i < 4; i++) {
            tasteDiveMovieIndex = Math.floor((Math.random() * 20));

            let movieRecommendation = response.Similar.Results[tasteDiveMovieIndex].Name;
            console.log(movieRecommendation);

            

            }
             
        }

        tasteDiveMovie();
               
      });
  });
})