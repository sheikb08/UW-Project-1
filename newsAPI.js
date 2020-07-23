/*Keyword or phrase. Eg: find all articles containing the word 'Microsoft'.
Date published. Eg: find all articles published yesterday.
Source name. Eg: find all articles by 'TechCrunch'.
Source domain name. Eg: find all articles published on thenextweb.com.
Language. Eg: find all articles written in English.*/

function getNewsAPI(){

    var country = "us";
    var category = "general";
    const apikey = "7e161d7be5ac4ab3a6b3b9cfd6f2de8b";

    var queryURL = "https://newsapi.org/v2/top-headlines?country=" + country + "&category=" +category + "&apiKey="+ apikey;
        console.log("in use query " + queryURL);

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            for(var i = 0; i < 5; i++){
                var newsDiv = $("<div class='news-block'>");
                var title = response.articles[i].title;
                var description = response.articles[i].description;
                var newsURL = response.articles[i].url;

                console.log("the title is "+title);



                 var headlines = $("<a>").text(title);
                     headlines.attr("href",newsURL);
                 var description = $("<p>").text(description);
                     description.css("font-size","10px");

                
                newsDiv.append(headlines);
                newsDiv.append(description);
                    
                    
                $("#news-block").append(newsDiv);
            }

            
        });
}

$(document).ready(function(){
    getNewsAPI();

});