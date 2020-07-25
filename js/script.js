
// function for fetching User's location from IP address
function fetchLocationFromIPGeolocationAPI(){

    var latitude,longitude;
    // IP Geolocation API query
    var ipQueryURL = "http://ip-api.com/json/";

    $.ajax({
        
        url : ipQueryURL,
        method : "GET"

    }).then(function(response){
      
        console.log("IPQueryURL : "+ipQueryURL);   
        
        latitude = response.lat;
        longitude = response.lon;
        
        //function called to load user's locations weather data
        loadUsersWeatherData(latitude,longitude);
    });
    
}

// Function to retrive User's Locations Weather Data
function loadUsersWeatherData(latitude,longitude){

    console.log("Latitude : "+latitude);
    console.log("Longitude : "+longitude);

    // Open Weather Map API key
    var openWeatherMapApiKey = "ae73148c56c6f5580bee66b9c7ed810c";

    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
    var weatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+openWeatherMapApiKey;

    $.ajax({
        
        url : weatherQueryURL,
        method : "GET"

    }).then(function(response){

        console.log("Weather API queryURL : "+weatherQueryURL);   

        var date = moment().format("ddd, MMMM Do YYYY");
        
        var locationIcon = $("<i>").addClass("map marker alternate icon");

        var cityName = response.name;

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        var imageIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon.toString() + ".png");

        var card = $("<div>").addClass("ui fluid card violet");
        var content = $("<div>").addClass("content");
        var dateDiv = $("<div>").addClass("header").text(date);
        var weather = $("<div>").addClass("header");

        var temp = $("<div>").addClass("description").text(tempF.toFixed(2)+" °F");

        weather.append(locationIcon,cityName,imageIcon);
        content.append(dateDiv,weather,temp);
        card.append(content);
        $("#weatherinfo").append(card);
    });
    
}



function getNewsAPI(inputTopic){

    var country = "us";//hard code for now
    var topic = inputTopic;
    //var topic = "tech";

    
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic="+ topic+"&lang=en&country="+country+"&media=True",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "newscatcher.p.rapidapi.com",
                "x-rapidapi-key": "d50bb86e14msh20481094a932c3bp157a8fjsn33cf930ef98d"
            }
        }
        console.log("in use query " + settings);
        $.ajax(settings).then(function(response) {

            for(var i = 0; i < 10; i++){
                var newsDiv = $("<div>").addClass("ui fluid card violet");
                    newsDiv.css("margin-left","20px");

                var title = response.articles[i].title;
                var description = response.articles[i].summary;
                var newsURL = response.articles[i].link;
                var blockContainer = $("<div>").addClass("content");
                console.log("the title is "+title);



                 var headlines = $("<a>").addClass("header").text(title);
                     headlines.attr("href",newsURL);
                     headlines.attr( "target",'_blank');
                 var description = $("<div>").addClass("description").text(description);


                
                blockContainer.append(headlines);
                blockContainer.append(description);
                newsDiv.append(blockContainer);    
                    
                $("#newsDiv").append(newsDiv);
            }

            
        });
}

function searchTopic(){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q=Elon%20Musk",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "newscatcher.p.rapidapi.com",
            "x-rapidapi-key": "2648d73644msh7de7f86cd3d47e9p11ae73jsn7736e63b5ea1"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

$(document).ready(function(){

    fetchLocationFromIPGeolocationAPI();  
    getNewsAPI();

});



