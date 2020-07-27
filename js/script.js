
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


//function to retrive news headlines in different categories from NewsCatcher API
function getNewsAPI(inputTopic){
    
    var country = "us";//hardcoded for now
    
    var topic = inputTopic;
 
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
        console.log("Newscatcher API query :" + settings);
  
        var title, description, newsURL;
        
        $.ajax(settings).then(function(response) {

            for(var i = 0; i < 10; i++){
                
                var newsDiv = $("<div>").addClass("ui fluid card violet");
                    newsDiv.css("margin-left","20px");

                 title = response.articles[i].title;
                 description = response.articles[i].summary;
                 newsURL = response.articles[i].link;
                
                 var blockContainer = $("<div>").addClass("content");
     
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

// function to get news headlines for searched topic in search bar
function searchTopic(){

    $("#newsDiv").empty();
    
    var topic = $("#search-topic-input").val().trim();

    if(topic === ""){
        return;
    }
  
     var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://newscatcher.p.rapidapi.com/v1/search?media=True&sort_by=relevancy&lang=en&page=1&q="+topic,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "newscatcher.p.rapidapi.com",
            "x-rapidapi-key": "2648d73644msh7de7f86cd3d47e9p11ae73jsn7736e63b5ea1"
        }
    }
    
    $.ajax(settings).then(function (response) {
       
        var articles = response.articles;

        var title, link, summary;
        
        for(var i = 0 ; i < articles.length ; i++){

            title = response.articles[i].title;
            link = response.articles[i].link;
            summary = response.articles[i].summary;

            var newsCard = $("<div>").addClass("ui fluid card violet");
            var content = $("<div>").addClass("content");

            var headlines = $("<a>").addClass("header").text(title);
            headlines.attr("href",link);
            headlines.attr("target",'_blank');
            
            var description = $("<div>").addClass("description").text(summary);

            content.append(headlines);
            content.append(description);
            newsCard.append(content);    
                
            $("#newsDiv").append(newsCard);
        }

    });
}

// function to get 'Fact Checked' news headlines from hoaxy API
function factCheckedNews(){

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
        
        var siteType, fcTitle, fcNewsURL, str, capDate, tweetNum;
        
        for(var i = 0; i < articleArray.length; i++ ){
            
            siteType = response.articles[i].site_type;
            
            if (siteType === "claim"){
                console.log("no fact checked news");
            }
            else if(siteType === "fact_checking"){
           
                var fcNewsDiv = $("<div>").addClass("ui fluid card violet");
                fcNewsDiv.css("margin-left","20px");

                 fcTitle = response.articles[i].title;
                 fcNewsURL = response.articles[i].canonical_url;
                 str = response.articles[i].date_captured;
                 capDate = str.substring(0,10);
                 tweetNum = response.articles[i].number_of_tweets;
                 
                var blockContainer = $("<div>").addClass("content");
            
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
    
    console.log("clearing newsDiv");
    $("#newsDiv").empty();
}


$("#search-topic-button").on("click",searchTopic);

$(document).ready(function(){

    fetchLocationFromIPGeolocationAPI();  
  
    var passingTopic = "world";
    getNewsAPI(passingTopic);//news to display when user first open the page

    $(document).on("click", ".item", function(event){
        
        clearNewsBlock();
        
        var inputTopic = $(this).attr("data-category");
        
        console.log("inputTopic is "+ inputTopic);
            
            if(inputTopic !== "factChecked"){
                
                getNewsAPI(inputTopic);   
            }
            else if(inputTopic === "factChecked"){
                
                factCheckedNews();
            }
     });


