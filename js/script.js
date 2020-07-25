

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


$(document).ready(function(){

    fetchLocationFromIPGeolocationAPI();  


});