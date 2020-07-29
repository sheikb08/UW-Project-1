# UW-Project-1 : Newsletter

# Goal : 

Build Newsletter application using **NewsCatcher API**, **Hoaxy API**, **IP Geolocation API** and **OpenWeatherMap API**.

# Motivation : 

To provide users with an all-in-one experience to retrieve top stories in different categories within country, fact check news and weather information from the user’s location. We want to empower the user by giving them the freedom to search news about specific topic.

# ScreenShots : 

# Demo : 

![Newsletter]()

# APIs Used : 

**1. [NewsCatcher API](https://newscatcherapi.com/)** : 

* Ultra-fast API to find latest news articles by any topic, country, category, language, website, or keyword.

* We Used this API to fetch latest news in different categories such as business, finance, sports, economics.

* Used this API to retrive topic related news articles searched by user.

**2. [Hoaxy API](https://rapidapi.com/truthy/api/hoaxy/details)** : 

* Hoaxy visualizes the spread of claims and related fact checking online. A claim may be a fake news article, hoax, rumor, conspiracy theory, satire, or even an accurate report. Anyone can use Hoaxy to explore how claims spread across social media. You can select any matching fact-checking articles to observe how those spread as well.

* We used this API to fetch 'fact checking' news articles.

**3. [OpenWeatherMap API](https://openweathermap.org/)**  : 

* [Current Weather Data](https://openweathermap.org/current) : Access current weather data for any location.
* Current weather is frequently updated based on global models and data from more than 40,000 weather stations. 
* Data is available in JSON, XML, or HTML format.
* We used this API to fetch user's locations current weather data by using latitude and longitude obtained from IP Geolocation API. 

**4. [IP Geolocation API](https://ip-api.com/)** : 

* Gives User's location related data based on User's IP address. 
* We have used this API to fetch user's location and get latitude and longitude.

# Tech/Frameworks Used : 

#### [Semantic UI](https://semantic-ui.com/) : 

* Semantic UI is a modern front-end development framework, powered by LESS and jQuery. It has a sleek, subtle, and flat design look that provides a lightweight user experience.
* Semantic UI provides responsive, mobile-first front-end web development.

#### [jQuery](https://jquery.com/) : 
* jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

#### [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) : 
* JavaScript is a cross-platform, object-oriented scripting language used to make webpages interactive.
* JavaScript(JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. 
* With the HTML DOM, JavaScript can access and change all the elements of an HTML document.

#### [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) : 

* HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content. 

* Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.CSS is one of the core languages of the open Web and is standardized across Web browsers according to the W3C specification. 


# Features : 

1. User can get latest news articles in different categories such as business, entertainment, politics, finance within a country.

2. User can search news articles for specific topic. 

3. User can get 'Fact Check' news articles.

4. User can find current weather data of user's location.

5. Used IP Geolocation API to get user's location and obtained current weather data from user's location.

6. Used AJAX to hook into the API to retrieve data in JSON format.

7. App runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

# Deployed Website : 
https://sheikb08.github.io/UW-Project-1/

