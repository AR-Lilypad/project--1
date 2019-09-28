
// This is our API key
var APIKey = "52e745084f07c32ae3a4b4ccd34672b9";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
    "zip=19446&units=imperial&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
         // Log the queryURL
         console.log(queryURL);

         // Log the resulting object
         console.log(response);
        var results = response.list;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].dt)
            console.log(results[i].main.temp)
            var randomDate = results[i].dt;
            var randomFormat = "X";
            var convertedDate = moment(randomDate, randomFormat);
            console.log(randomDate)
            console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss a"))
            var nextTime = convertedDate.format("MMM Do, YYYY hh:mm:ss a");
            // div for each temp/time
            // console.log(timeDiv);
            var timeDiv = $("<div>");
            var timeBlock = $("<div>");
            

            timeBlock.addClass("time-div");
            // console.log(nextTime);

            timeBlock.attr("data-time", nextTime);
            timeBlock.t

            // console.log(nextTime);

            $("blocks-go-here").prepend(timeDiv);
            // console.log(timeDiv);

            // var randomTemp = $(".temp").text(results[i].main.temp + " (F) ");
            // var randomTime = $(".time").text(nextTime);
            // timeDiv.append(randomTime);
            // console.log(randomTime);
            // console.log(randomTemp);
            // timeDiv.append(randomTemp)
        }
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);
        console.log(response.list);

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);


        // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + response.main.temp);
    });

