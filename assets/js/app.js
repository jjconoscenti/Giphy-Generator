$( document ).ready(function() {
// global variables

var gifs = ["30 Rock", "Game of Thrones", "House of Cards", "Batman", "Spiderman", "Kimmy Schmidt", "Arrested Development", "Kanye West"];

// adds buttons
gifButtons = function() {

	$("#gifButtonLibrary").empty();

	for (i=0; i<gifs.length; i++) {
    var gifBtn = GifButton(gifs[i]);
    $("#gifButtonLibrary").append(gifBtn);
    alert("merge conflict");
  }
}

// display gifs via API
displayGifs = function () {

  $("#gifDisplay").html('One moment!');
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

// click function puts search term into the gif array
$("#submitGif").on("click", function(event) {

        event.preventDefault();

        var newButton = $("#newGifButtons").val();
        gifs.push(newButton);
        gifButtons();
        $("#inputForm").children("input").val("");
      });

function GifButton (btn) {
	  var gifBtn = $("<button>");
	  gifBtn.addClass("btn btn-default gifButton");
	  gifBtn.attr("giphy", btn);
	  gifBtn.text(btn);
	  gifBtn.on('click', displayGifs);
  return gifBtn;
}

function GifDisplay (gif) {
  var playGif = gif.images.fixed_height.url;
  var pauseGif = gif.images.fixed_height_still.url;
  var playstate = false;
  var gifRating = gif.rating;

  var gifElement = $("<div class='gif'></div>")
  var rating = $("<p>rating: " + gifRating+ "</p>");
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


















