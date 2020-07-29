
// function for fetching User's location from IP address
function fetchLocationFromIPGeolocationAPI(){

    var latitude,longitude;
    
    // IP Geolocation API query
    var ipQueryURL = "https://freegeoip.app/json/";

    $.ajax({
        
        url : ipQueryURL,
        method : "GET"

    }).then(function(response){
      
        console.log("IPQueryURL : "+ipQueryURL);   
        
        latitude = response.latitude;
        longitude = response.longitude;
        
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

        var temp = $("<div>").addClass("description").html("<h4>"+tempF.toFixed(2)+" °F</h4>");

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
  
        var title, summary, newsURL, date;
        
        $.ajax(settings).then(function(response) {

            for(var i = 0; i < 10; i++){
                
                var newsDiv = $("<div>").addClass("ui fluid card violet");

                 title = response.articles[i].title;
                 summary = response.articles[i].summary;
                 newsURL = response.articles[i].link;
                 date = (response.articles[i].published_date).substring(0,10);
                
                 var blockContainer = $("<div>").addClass("content");
     
                 var headlines = $("<a>").addClass("header headline").text(title);
                     headlines.attr("href",newsURL);
                     headlines.attr( "target",'_blank');
                 
                var description = $("<div>").addClass("description").text(summary);
                var publishDate = $("<div>").addClass("description").html("<h4>Published Date : "+date+"</h4>");

                blockContainer.append(headlines);
                blockContainer.append(description);
                blockContainer.append(publishDate);
                newsDiv.append(blockContainer);    
                    
                $("#newsDiv").append(newsDiv);
            }            
        });
}

// function to get news headlines for searched topic in search bar
function searchTopic(event){

    event.preventDefault();
    $("#newsDiv").empty();
    $(".active").removeClass("active");
    var topic = $("#search-topic-input").val().trim();

    $("#headline-type").html('<div class="ui fluid card violet"><div class="content"><div class="ui purple header"><h2><i class="newspaper outline icon"></i> Search Results for '+topic+' :</h2></div></div></div>');  
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

        var title, link, summary,date;
        
        for(var i = 0 ; i < articles.length ; i++){

            title = response.articles[i].title;
            link = response.articles[i].link;
            summary = response.articles[i].summary;
            date = (response.articles[i].published_date).substring(0,10);

            var newsCard = $("<div>").addClass("ui fluid card violet");
            var content = $("<div>").addClass("content");

            var headlines = $("<a>").addClass("header headline").text(title);
            headlines.attr("href",link);
            headlines.attr("target",'_blank');
            
            var description = $("<div>").addClass("description").text(summary);

            var publishedDate = $("<div>").addClass("description").html("<h4>Published Date : "+date+"</h4>");

            content.append(headlines);
            content.append(description);
            content.append(publishedDate);
            newsCard.append(content);    
                
            $("#newsDiv").append(newsCard);        

        }
        $("#search-topic-input").val(" ");
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
    
    $.ajax(settings).then(function (response) {
        
        var articleArray = response.articles;
        
        var siteType, fcTitle, fcNewsURL, str, capDate, tweetNum;
        
        for(var i = 0; i < articleArray.length; i++ ){
            
            siteType = response.articles[i].site_type;
            
            if(siteType === "fact_checking"){
           
                var fcNewsDiv = $("<div>").addClass("ui fluid card violet");

                 fcTitle = response.articles[i].title;
                 fcNewsURL = response.articles[i].canonical_url;
                 str = response.articles[i].date_captured;
                 capDate = str.substring(0,10);
                 tweetNum = response.articles[i].number_of_tweets;
                 
                var blockContainer = $("<div>").addClass("content");
            
                var fcHeadlines = $("<a>").addClass("header headline").text(fcTitle);
                    fcHeadlines.attr("href",fcNewsURL);
                    fcHeadlines.attr( "target",'_blank');
                
                var capturedDate = $("<div>").addClass("capturedDate").html("Captured Date : "+capDate);
                
                var tweetedTime = $("<div>").addClass("tweetTime").text("Tweet Count : "+tweetNum);

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

    $("#newsDiv").empty();
}

//Search topic 
$("#search-topic-button").on("click",searchTopic);

// On page load 
$(document).ready(function(){

    // called function to fetch user's location and load current weather of user's location
    fetchLocationFromIPGeolocationAPI();  
  
    var passingTopic = "world";
    getNewsAPI(passingTopic);//news to display when user first open the page

    $("#headline-type").html('<div class="ui fluid card violet"><div class="content"><div class="ui purple header"><h2><i class="newspaper outline icon"></i> World :</h2></div></div></div>');  

    //When clicked on menu item
    $(document).on("click", ".item", function(event){
        
        clearNewsBlock();
        
        var inputTopic = $(this).attr("data-category");
        var newsType = $(this).text().trim();
          
        console.log("inputTopic is "+ inputTopic);
            
            if(inputTopic !== "factChecked"){
                
                $(".active").removeClass("active");
                $(this).addClass("active");
                getNewsAPI(inputTopic); 
                $("#headline-type").html('<div class="ui fluid card violet"><div class="content"><div class="ui purple header"><h2><i class="newspaper outline icon"></i> '+newsType+' :</h2></div></div></div>');  
                
            }
            else if(inputTopic === "factChecked"){
                $(".active").removeClass("active");
                $(this).addClass("active");
                factCheckedNews();
                $("#headline-type").html('<div class="ui fluid card violet"><div class="content"><div class="ui purple header"><h2><i class="newspaper outline icon"></i> '+newsType+' :</h2></div></div></div>');  
            }

    });
});
