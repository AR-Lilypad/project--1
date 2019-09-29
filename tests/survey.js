
$(document).on("click", ".form-check-input", function () {
})
//  function displayRadioValue() {        
//             }
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
var gifDiv;

// Capture Button Click
$("#add-user").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    $("#weather-table > tbody").empty();
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    birthday = $("#birthday-input").val().trim();
    zip = $("#zip-input").val().trim();
    comment = $("#comment-input").val().trim();
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
    ajaxCall()
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

        $("#name-display").text(survey.name);
        $("#email-display").text(survey.email);
        $("#birthday-display").text(survey.birthday);
        $("#zip-display").text(survey.zip);
        $("#commute-display").text(survey.commute);
        $("#run-display").text(survey.run);
        $("#comment-display").text(survey.comment);
        zip = survey.zip;
        birthday = survey.birthday;
        var birthdayFormat = "YYYY-MM-DD";
        var convertedBirthday = moment(birthday, birthdayFormat);
        console.log(birthday)
        console.log(convertedBirthday.diff(moment(), "years"));
        age = Math.abs(convertedBirthday.diff(moment(), "years"));
        $("#age-display").text(age);
    })

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
    })
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
            for (var i = 0; i < 10; i++) {
                console.log(results[i].main.temp)
                var temp = results[i].main.temp;
                var weather = results[i].weather[0].main;
                console.log(results[i].weather[0].main)
                var randomDate = results[i].dt;
                var randomFormat = "X";
                var convertedDate = moment(randomDate, randomFormat);
                console.log(randomDate);

                console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss a"))
                var nextTime = convertedDate.format("MMM Do, YYYY hh:mm:ss a");
              
                console.log(convertedDate.diff(moment(), "days"));
                var searchGiphy = function (weather) {
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        weather + "&api_key=ooDPmDwDsJjgy2ei3vg18DmM4ZSisk1k";
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {  // Storing an array of results in the results variable
                        var results = response.data;
                        for (var i = 0; i < 1; i++) {
                            // Creating a div for the gif
                            var gifDiv = $("<div>");
                            // Creating an image tag
                            var gifImage = $("<img>");
                            gifImage.addClass("gif-image");
                            // Giving the image tag an src attribute of a proprty pulled off the
                            // result item
                            gifImage.attr("src", results[i].images.fixed_height.url);
                            gifImage.attr("data-image", weather);
                            gifDiv.append(gifImage);
                            console.log($("data-image").val())
                            // Prepending the giftd to the "#gifs-appear-here" div in the HTML
                              $("#gifs-appear-here").append(gifDiv);
                        }
                    });
                }
                console.log(searchGiphy(weather))
                searchGiphy(weather)
                // Create the new row

                var newRow = $("<tr>").append(
                    $("<td>").text(nextTime),
                    $("<td>").text(temp),
                    $("<td>").text(weather),
                    // $("<td>").prepend(gifDiv[1]),
                    $("<td>").prepend( $("#gifs-appear-here"))
                );
                console.log(newRow)
                // Append the new row to the table
                $("#weather-table > tbody").append(newRow);
            }

        });
}





