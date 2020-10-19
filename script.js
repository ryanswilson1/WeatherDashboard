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
