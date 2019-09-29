
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
var userScore = 0;
var currentUserScore = 0;
var rowTime = [];
var rowImage = [];
var rowTemp = [];
var rowText = [];
var setCondition = "";

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

        $("#name-display").text("Name: " + survey.name);
        $("#email-display").text("Email: " + survey.email);
        $("#birthday-display").text("Birthday: " + survey.birthday);
        $("#zip-display").text("Zip code: " + survey.zip);
        $("#commute-display").text("Commute: " + survey.commute);
        $("#run-display").text("Tend to run hot or cold: " + survey.run);
        $("#comment-display").text("How did you hear about us: " + survey.comment);
        zip = survey.zip;
        birthday = survey.birthday;
        var birthdayFormat = "YYYY-MM-DD";
        var convertedBirthday = moment(birthday, birthdayFormat);
        console.log(birthday)
        console.log(convertedBirthday.diff(moment(), "years"));
        age = Math.abs(convertedBirthday.diff(moment(), "years"));
        $("#age-display").text("Age: " + age);
    })
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
                console.log(userScore)
                currentUserScore = 0;
                currentUserScore = userScore + temp;
                console.log(currentUserScore)
                rowTemp.push(temp);
                console.log(results[i].weather[0].main)
                var randomDate = results[i].dt;
                var randomFormat = "X";
                var convertedDate = moment(randomDate, randomFormat);
                console.log(randomDate);

                console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss a"))
                var nextTime = convertedDate.format("MMM Do, YYYY hh:mm:ss a");
                rowTime.push(nextTime);
console.log(typeof nextTime)
              
                console.log(convertedDate.diff(moment(), "days"));
//                var searchGiphy = function (weather) {
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                        weather + "&api_key=ooDPmDwDsJjgy2ei3vg18DmM4ZSisk1k&limit=1";
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {  // Storing an array of results in the results variable
                        var results = response.data;
//                        for (var i = 0; i < 1; i++) {
                            // Creating a div for the gif
                            var gifDiv = $("<div>");
                            // Creating an image tag
                            var gifImage = $("<img>");
                            gifImage.addClass("gif-image");
                            // Giving the image tag an src attribute of a proprty pulled off the
                            // result item
                            gifImage.attr("src", results[0].images.fixed_height.url);
                            gifImage.attr("data-image", weather);
                            gifDiv.append(gifImage);
                            console.log($("data-image").val())
                            // Prepending the giftd to the "#gifs-appear-here" div in the HTML
                              $("#gifs-appear-here").append(gifDiv);
//                        }
console.log(currentUserScore)
console.log(typeof weather)
                            if (currentUserScore >= 70 && weather !== "Rain"){
                                setCondition = "T-shirt and shorts";
                                rowImage.push(gifDiv);
                                rowText.push(setCondition);
                            }
                            else if (currentUserScore < 70 && weather !== "Rain"){
                                setCondition = "Wear a sweater";
console.log(setCondition)
                                rowImage.push(gifDiv);
                                rowText.push(setCondition);
console.log(rowText)
console.log(rowImage)
                            }
                            else if (currentUserScore >= 70 && weather === "Rain"){
                                setCondition = "Bring a jacket";
                                rowImage.push(gifDiv);
                                rowText.push(setCondition);
                            }        
                            else if (currentUserScore < 70 && weather === "Rain"){
                                setCondition = "Wear a coat and bring an umbrella";
                                rowImage.push(gifDiv);
                                rowText.push(setCondition);
                            }
                    });
                // }
                // console.log(searchGiphy(weather))
                // searchGiphy(weather)
                // Create the new row

                // var newRow = $("<tr>").append(
                //     $("<td>").text(nextTime),
                //     $("<td>").text(temp),
                //     $("<td>").text(weather),
                //     // $("<td>").prepend(gifDiv[1]),
                //     $("<td>").prepend( $("#gifs-appear-here"))
                // );
                // console.log(newRow)
                // // Append the new row to the table
                // $("#weather-table > tbody").append(newRow);

console.log(rowText)

            }
console.log(rowTime)
console.log(rowImage)
console.log(rowTemp)
console.log(rowText)
            $("#weather-results").append(
                "<tr><td>" + rowTime[0]+ "</td>" + 
                "<td>" + rowTime[1] + "</td>" +
                "<td>" + rowTime[2] + "</td>" +
                "<td>" + rowTime[3] + "</td>" +
                "<td>" + rowTime[4] + "</td>" +
                "<td>" + rowTime[5] + "</td>" +
                "<td>" + rowTime[6] + "</td>" +
                "<td>" + rowTime[7] + "</td>" +
                "<td>" + rowTime[8] + "</td>" +
                "<td>" + rowTime[9] + "</td>" +
                "</td></tr>");
                $("#weather-results").append(
                "<tr><td>" + rowImage[0] + "</td>" + 
                "<td>" + rowImage[1] + "</td>" +
                "<td>" + rowImage[2] + "</td>" +
                "<td>" + rowImage[3] + "</td>" +
                "<td>" + rowImage[4] + "</td>" +
                "<td>" + rowImage[5] + "</td>" +
                "<td>" + rowImage[6] + "</td>" +
                "<td>" + rowImage[7] + "</td>" +
                "<td>" + rowImage[8] + "</td>" +
                "<td>" + rowImage[9] + "</td>" +
                "</td></tr>");
                $("#weather-results").append(
                "<tr><td>" + rowTemp[0] + "</td>" + 
                "<td>" + rowTemp[1] + "</td>" +
                "<td>" + rowTemp[2] + "</td>" +
                "<td>" + rowTemp[3] + "</td>" +
                "<td>" + rowTemp[4] + "</td>" +
                "<td>" + rowTemp[5] + "</td>" +
                "<td>" + rowTemp[6] + "</td>" +
                "<td>" + rowTemp[7] + "</td>" +
                "<td>" + rowTemp[8] + "</td>" +
                "<td>" + rowTemp[9] + "</td>" +
                "</td></tr>");
                console.log(rowText[0])
                $("#weather-results").append(
                "<tr><td>" + rowText[0] + "</td>" + 
                "<td>" + rowText[1] + "</td>" +
                "<td>" + rowText[2] + "</td>" +
                "<td>" + rowText[3] + "</td>" +
                "<td>" + rowText[4] + "</td>" +
                "<td>" + rowText[5] + "</td>" +
                "<td>" + rowText[6] + "</td>" +
                "<td>" + rowText[7] + "</td>" +
                "<td>" + rowText[8] + "</td>" +
                "<td>" + rowText[9] + "</td>" +
                "</td></tr>");
        });
}





