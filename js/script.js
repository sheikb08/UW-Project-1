

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
    //console.log("i am called and the inputTopic is " + inputTopic);
    var country = "us";//hardcoded for now
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

function factCheckedNews(){
    
    console.log("fact check function is called");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-hoaxy.p.rapidapi.com/top-articles?most_recent=false",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-hoaxy.p.rapidapi.com",
            "x-rapidapi-key": "d50bb86e14msh20481094a932c3bp157a8fjsn33cf930ef98d"
        }
    }
    
    $.ajax(settings).done(function (response) {
        var articleArray = response.articles;
        console.log("the length is "+ articleArray.length);
        for(var i = 0; i < articleArray.length; i++ ){
            var siteType = response.articles[i].site_type;
            //console.log(typeof siteType);
            if (siteType === "claim"){
                console.log("no fact checked news");
            }
            else if(siteType === "fact_checking"){
                console.log("we got some fact checked news");
                var fcNewsDiv = $("<div>").addClass("ui fluid card violet");
                fcNewsDiv.css("margin-left","20px");

                var fcTitle = response.articles[i].title;
                var fcNewsURL = response.articles[i].canonical_url;
                var str = response.articles[i].date_captured;
                var capDate = str.substring(0,10);
                var tweetNum = response.articles[i].number_of_tweets;
                var blockContainer = $("<div>").addClass("content");
                //console.log(typeof capDate);



                var fcHeadlines = $("<a>").addClass("header").text(fcTitle);
                    fcHeadlines.attr("href",fcNewsURL);
                    fcHeadlines.attr( "target",'_blank');
                var capturedDate = $("<div>").addClass("capturedDate").text("This news has been captured on : "+capDate);
                var tweetedTime = $("<div>").addClass("tweetTime").text("This news has been tweeted: "+tweetNum +"times.");

                blockContainer.append(fcHeadlines);
                blockContainer.append(capturedDate);
                blockContainer.append(tweetedTime);
                fcNewsDiv.append(blockContainer);    
                    
                $("#newsDiv").append(fcNewsDiv);
                i++;
            }
        }
    });

}

function clearNewsBlock(){
    console.log("claering");
    $("#newsDiv").empty();
}


$(document).ready(function(){

    fetchLocationFromIPGeolocationAPI();  
    var passingTopic = "world";
    getNewsAPI(passingTopic);//news to display when user first open the page

    $(document).on("click", ".item", function(event){
        clearNewsBlock();
        console.log("i am clicked");
        var inputTopic = $(this).attr("data-category");
        console.log("inputTopic is "+ inputTopic);
            if(inputTopic !== "factChecked"){
                getNewsAPI(inputTopic);   
            }
            else if(inputTopic === "factChecked"){
                factCheckedNews();
            }
  
       });

});