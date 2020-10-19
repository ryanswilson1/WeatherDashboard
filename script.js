var apiKey = "&appid=464764e6ddc09976761591e96a505215";
var date = new Date();
var cityName = JSON.parse(localStorage.getItem('cityName')) || [];
var year = moment().format('YYYY');
var Recents = cityName.length - 1;

$("#dailyForecast").hide();

$("#searchTerm").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

function list(city, i) {
    var cityItem = $("<button>").addClass("list-group-item list-group-item-action queryCities");
    cityItem.text(city);

    $(".list").prepend(cityItem);
}
function queryCities() {
    if (cityName !== null) {
        $(".list").empty();
        for (var i = 0; i < cityName.length; i++) {
            list(cityName[i], i);
        }
        city = cityName[Recents];
        retrieveWeather(city);
    }
}
function currentForecast(response) {
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name + " " + date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    var uvId = $('<p>').addClass('uvId');
    var latitude = response.coord.lat;
    var longitutde = response.coord.lon;

    function getuvId() {
        var uvUrl =
            'https://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&longitutde=' + longitutde + apiKey;
        $.ajax({
            url: uvUrl,
            method: 'GET'
        }).then(function (response) {

            var uvClass = $(".uvId");
            var uvi = response.value;
            var uvSpan = "<span id='uvi'>" + uvi + "</span>";
            uvClass.append("<p> UV Index:   " + uvSpan);

            if (uvi < 3) {
                $("#uvi").attr("style", "background-color: green;");
            } else if (uvi < 6) {
                $("#uvi").attr("style", "background-color: yellow; color: black;");
            } else if (uvi < 8) {
                $("#uvi").attr("style", "background-color: orange; color: black;");
            } else if (uvi < 11) {
                $("#uvi").attr("style", "background-color: red;");
            } else if (11 <= uvi) {
                $("#uvi").attr("style", "background-color: purple;");
            }
        });
    }

    getuvId();

    city.append(image);
    cardBody.append(city, temperature, humidity, wind, uvId);
    card.append(cardBody);
    $("#currentCity").append(card);
}

