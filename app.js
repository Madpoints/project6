/*global $*/


$(document).ready(function() {
   getLocation();
   $('#unit').click(function() {
   		convert();
   });
});

function getWeather(position) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&APPID=d97c4820eeb5a1aad58317e076d46d45',
        success: function(response) {
        	console.log(response);
        	$('#city').text(response.name + ",");
        	$('#country').text(response.sys.country);
            $('#temp').text(Math.round(response.main.temp));
            $('#degree').html("&#176");
            $('#unit').text("F");
            $('#descr').text(response.weather[0].description); 
            var icon = response.weather[0].icon; 
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#icon').html("<img src='" + iconUrl  + "'>");
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } 
}

function convert() {
    var x;
    var unit = $('#unit').text();
    var temp = $('#temp').text();
    console.log(unit);
    if (unit === "F") {
        x = (temp - 32) * 5 / 9;
        $('#temp').text(Math.round(x));
        $('#unit').text("C");
    } 
    if (unit === "C") {
        x = temp * 9 / 5 + 32;
        $('#temp').text(Math.round(x));
        $('#unit').text("F");
    }
}
