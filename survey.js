$(document).ready(function () {
    $("#results").hide(); 

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDp6fG4do2N1EU37zD-pZRV0jatGPFZ_Qw",
        authDomain: "weather-wear-76e8c.firebaseapp.com",
        databaseURL: "https://weather-wear-76e8c.firebaseio.com",
        projectId: "weather-wear-76e8c",
        storageBucket: "weather-wear-76e8c.appspot.com",
        messagingSenderId: "108370961630",
        appId: "1:108370961630:web:bb265646fec9c37f1c8e4f",
        measurementId: "G-2RFBY0VJKQ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //   firebase.analytics();
    
    // Create a variable to reference the database
    var database = firebase.database();
    // Initial Values
    var name = "";
    var email = "";
    var birthday;
    var zip = "19446";
    var commute = "";
    var run = "";
    var comment = "";
    var age;
    var userScore = 0;
    var currentUserScore = 0;
    var setCondition = "";
    
    // Capture Button Click
    $("#add-user").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();
        $("#results").show(); 
       
        $("#weather-table > tbody").empty();
        // name = $("#name-input").val().trim();
        // email = $("#email-input").val().trim();
        birthday = $("#birthday-input").val().trim();
        zip = $("#zip-input").val().trim();
        // comment = $("#comment-input").val().trim();
        document.querySelectorAll('.form-check-input').forEach(function (element) {
            if (element.checked) {
                if (element.name === "commute") {
                    commute = element.value;
                }
                if (element.name === "run") {
                    run = element.value;
                }
            }
        });
        database.ref("/surveys").push({
            name: name,
            email: email,
            birthday: birthday,
            zip: zip,
            comment: comment,
            commute: commute,
            run: run
        });
        ajaxCall();
        $("#survey").hide();
    });
    
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref("/surveys").on("value", function (snapshot) {
    
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        const surveys = snapshot.val();
    
        Object.values(surveys).forEach(function (survey) {
            console.log(survey);
            console.log(survey.name);
            console.log(survey.email);
            console.log(survey.birthday);
            console.log(survey.zip);
            console.log(survey.commute);
            console.log(survey.run);
            console.log(survey.comment);
    
            // $("#name-display").text("Name: " + survey.name);
            // $("#email-display").text("Email: " + survey.email);
            $("#birthday-display").text("Birthday: " + survey.birthday);
            $("#zip-display").text("Zip code: " + survey.zip);
            $("#commute-display").text("Commute: " + survey.commute);
            $("#run-display").text("Tend to run hot or cold: " + survey.run);
            $("#retake").on("click", retake);
            function retake() {
                $("#survey").show()
            }
            // $("#comment-display").text("How did you hear about us: " + survey.comment);
            zip = survey.zip;
            birthday = survey.birthday;
            var birthdayFormat = "YYYY-MM-DD";
            var convertedBirthday = moment(birthday, birthdayFormat);
            console.log(birthday)
            console.log(convertedBirthday.diff(moment(), "years"));
            age = Math.abs(convertedBirthday.diff(moment(), "years"));
        
        console.log(survey);
        //Customization for user
        if (age >= 50){
            userScore = userScore - 2;
        }
        if (survey.commute === "Public transit"){
            userScore = userScore - 2;
        } else if (survey.commute === "Personal vehicle"){
            userScore = userScore + 2;
        } else if (survey.commute === "I walk"){
            userScore = userScore - 2;
        }
        if (survey.run === "Cold"){
            userScore = userScore - 2;
        } else if (survey.run === "Hot"){
            userScore = userScore + 2;
        }
    });
    
        Object.entries(surveys).forEach(function (survey) {
            console.log(survey);
            console.log(survey[0]);
            console.log(survey[1].name);
            console.log(survey[1].email);
            console.log(survey[1].birthday);
            console.log(survey[1].zip);
            console.log(survey[1].commute);
            console.log(survey[1].run);
            console.log(survey[1].comment);
            console.log(zip)
        });
        
    },
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        }
    );
    console.log(database)
    function ajaxCall() {
        console.log(zip)
        // This is our API key
        var APIKey = "52e745084f07c32ae3a4b4ccd34672b9";
        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
            "zip=" + zip + "&units=imperial&cnt=10&appid=" + APIKey;
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
                var giphyPromises = [];
                for (var i = 0; i < 10; i++) {
                    console.log(results[i].main.temp)
                    var temp = results[i].main.temp;
                    var weather = results[i].weather[0].main;
                    currentUserScore = 0;
                    currentUserScore = userScore + temp;
                    console.log(results[i].weather[0].main)
                    var randomDate = results[i].dt;
                    var randomFormat = "X";
                    var convertedDate = moment(randomDate, randomFormat);
                    console.log(randomDate);
                    console.log(convertedDate.format("MMM Do, YYYY hh:mm a"))
                    var nextTime = convertedDate.format("MMM Do h:mm a");
                    var giphyPromise = null;
                    if (currentUserScore >= 70 && weather !== "Rain"){
                        setCondition = "Wear a T-shirt & shorts";
                        giphyPromise = searchGiphy(nextTime, temp, weather, setCondition);
                    }
                    else if (currentUserScore < 70 && weather !== "Rain"){
                        setCondition = "Wear a sweater";
                        giphyPromise = searchGiphy(nextTime, temp, weather, setCondition);
                    }
                    else if (currentUserScore >= 70 && weather === "Rain"){
                        setCondition = "Bring a jacket";
                        giphyPromise = searchGiphy(nextTime, temp, weather, setCondition);
                    }        
                    else {
                        setCondition = "Wear a raincoat";
                        giphyPromise = searchGiphy(nextTime, temp, weather, setCondition);
                    }
                    giphyPromises.push(giphyPromise);
                };
                Promise.all(giphyPromises)
                .then (function (result){
                    console.log("In promise.all")
                    console.log(result)
                    for (var i = 0; i < 10; i++){
                    $("#weather-table > tbody").append(result[i]);
                    }
                })
            });
           
    };
    var gifURL;
    
        function searchGiphy(nextTime, temp, weather, setCondition){
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            weather + "&api_key=ooDPmDwDsJjgy2ei3vg18DmM4ZSisk1k&limit=10";
            return $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function (response) {  // Storing an array of results in the results variable
                var results = response.data;
                // Creating a div for the gif
                console.log(results)
                console.log($("<div class=gifs>"))
                for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=gifs>");
               
                // Creating an image tag
                var gifImage = $("<img>");
                gifImage.addClass("gif-image");
                gifURL=results[i].images.fixed_height.url;
                console.log(gifURL)
                gifImage.attr("src", results[i].images.fixed_height.url);
                console.log(results[i].images.fixed_height.url)
                var timeDisplay = $("<p>").text(nextTime);
                timeDisplay.addClass("timeText");
                var tempDisplay = $("<p>").text(temp + " F");
                tempDisplay.addClass("tempText");
                var weatherDisplay = $("<p>").text(weather);
                weatherDisplay.addClass("weatherText");
                var conditionDisplay = $("<p>").text(setCondition);
                conditionDisplay.addClass("conditionText")
                gifDiv.append(timeDisplay);
                gifDiv.append(tempDisplay);
                gifDiv.append(weatherDisplay);
                gifDiv.append(conditionDisplay);
                gifDiv.append(gifImage);
                return gifDiv;
            }});
        };
    });
    