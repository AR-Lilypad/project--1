


 var macys = ["Fall Sweaters", "Fall Jackets", "Fall Shirts","Fall Pants", "Fall Dresses"];
 // var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
 
 var clothes = $(this).attr("data-name");
 var queryURL = "http://api.macys.com/v4/catalog/search?searchphrase=fall+dresses&x-macys-webservice-client-id:pds2kqageazpfkmtmhzk3qbm"

 $.ajax({
   url: queryURL,
   headers:{
    Accept: "application/json", // you can quote the key here too, but the value has to be quoted.
    "x-macys-webservice-client-id:pds2kqageazpfkmtmhzk3qbm" // the key must be quoted since - aren't allowed in key names. if apikey is not a variable, then it should be quoted too.
},
   method: "GET"
 }).then(function(response) {                //can call it by function(res) or function(data) but we will use function(response)
   console.log(response);                    // can call specific elements of JSON
     
 });


 //http://developer.macys.com/io-docs
 //http://developer.macys.com/docs/catalog_and_store_services/catalog/search/#queryparameters