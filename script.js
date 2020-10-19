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
