

function getNewsAPI(){

    var country = "us";
    var topic = "tech";

    
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
                var newsDiv = $("<div>").addClass("ui card violet");
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
                    
                $("#news-block").append(newsDiv);
            }

            
        });
}



$(document).ready(function(){
    getNewsAPI();
   
});



