$( document ).ready(function() {
// global variables

var gifs = ["30 Rock", "Game of Thrones", "House of Cards", "Batman", "Spiderman", "Kimmy Schmidt", "Arrested Development"];

// adds buttons
gifButtons = function() {

	$("#gifButtonLibrary").empty();

	for (i=0; i<gifs.length; i++) {
    var gifBtn = GifButton(gifs[i]);
    $("#gifButtonLibrary").append(gifBtn);
  }
}

// display gifs via API
displayGifs = function () {

  $("#gifDisplay").html('Loading...');
	var gifName = $(this).attr("giphy");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifName+"&api_key=dc6zaTOxFJmzC&rating=r&sort=relevant&limit=15";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
    $("#gifDisplay").html('');
		var results = response.data;

		for (i=0; i<results.length; i++) {
      		var gifImage = GifDisplay(response.data[i]);
			$("#gifDisplay").prepend(gifImage);
		}
	});
}

// this click function will put the user input into the gif array
$("#submitGif").on("click", function(event) {

        event.preventDefault();

        var newButton = $("#newGifButtons").val();
        gifs.push(newButton);
        gifButtons();
        $("#inputForm").children("input").val("");
      });

function GifButton (btn) {
	  var gifBtn = $("<button>");
	  gifBtn.addClass("btn btn-success gifButton");
	  gifBtn.attr("giphy", btn);
	  gifBtn.text(btn);
	  gifBtn.on('click', displayGifs);
  return gifBtn;
}

function GifDisplay (gif) {
  var playGif = gif.images.fixed_height.url;
  var pauseGif = gif.images.fixed_height_still.url;
  var gifRating = gif.rating;
  var playstate = false;

  var gifElement = $("<div class='gif'></div>")
  var rating = $("<p>rating: " + gifRating+"</p>");
  var gifImage = $("<img></img>");
  gifElement.append(rating);
  gifElement.append(gifImage);
  gifImage.addClass("gifImage");
  gifImage.attr("src", pauseGif);

  	// click to toggle play / pause 
	  gifImage.on('click', function () {
	    if (!playstate) {
	      gifImage.attr("src", playGif);
	    } else {
	      gifImage.attr("src", pauseGif);
	    }
	    playstate = !playstate
	  })

  return gifElement
}


gifButtons();


});


















