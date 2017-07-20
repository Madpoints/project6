/*global $*/
var long;

var lang;

$(document).ready(function() {
   getWeather(long, lang); 
});

function getWeather(long, lang) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=Bristol,US&APPID=d97c4820eeb5a1aad58317e076d46d45",
        success: function(response) {
            console.log(response);    
        }
    });
}