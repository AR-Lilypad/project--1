
$(document).on("click", ".form-check-input", function(){
    
})
        function displayRadioValue() {
            
            
            }
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
var birthday = 0;
var zip = 0;
var commute = "";
var run = "";
var comment = "";

// Capture Button Click
$("#add-user").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();


    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    birthday = $("#birthday-input").val().trim();
    zip = $("#zip-input").val().trim();
    // commute = $("#commute-input").val().trim();
    // run = $("#run-input").val().trim();
    comment = $("#comment-input").val().trim();

    document.querySelectorAll('.form-check-input').forEach(function(element) {
        if(element.checked) {
            if(element.name === "commute") {
                commute = element.value;
            }
            if(element.name === "run") {
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

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref("/surveys").on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    const surveys = snapshot.val();
    const key = snapshot.key;

    Object.values(surveys).forEach(function(survey) {
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
    })
    
    Object.entries(surveys).forEach(function(survey) {
        console.log(survey);
        console.log(survey[0]);
        console.log(survey[1].name);
        console.log(survey[1].email);
        console.log(survey[1].birthday);
        console.log(survey[1].zip);
        console.log(survey[1].commute);
        console.log(survey[1].run);
        console.log(survey[1].comment);
        
    })

    

    // Change the HTML to reflect
    

    // Handle the errors
},
    function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
);

