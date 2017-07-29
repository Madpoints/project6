/*global $*/
var weatherCodes = [["01", "clearSky"], ["02", "fewClouds"], ["03", "scatteredClouds"], ["04", "brokenClouds"], ["09", "showerRain"], ["10", "rain"], ["11", "thunderstorm"], ["13", "snow"], ["50", "mist"]];

var weatherData;

$(document).ready(function() {
   getLocation();
   $('#unit').click(function() {
   		convert();
   });
   $('#moreInfo').click(function() {
   		getMoreInfo(weatherData.main);
   });
});

function getWeather(position) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=imperial&APPID=d97c4820eeb5a1aad58317e076d46d45',
        success: function(response) {
        	console.log(response);
        	weatherData = response;
        	addContent(response);
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
    
    if (unit === "F") {
        x = (temp - 32) * 5 / 9;
        $('#temp').text(Math.round(x));
        $('#unit').text("C");
    } 
    else {
        x = temp * 9 / 5 + 32;
        $('#temp').text(Math.round(x));
        $('#unit').text("F");
    }
}

function addContent(response) {
	var iconCode = response.weather[0].icon; 
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    $('#icon').html("<img src='" + iconUrl  + "'>");
	weatherCodes.forEach(function(code) {
		if (code[0] === iconCode.slice(0, -1)) {
			console.log(code[1]);
			$('body').css("background-image", 'url(./images/' + code[1] + '.jpg)');
		}
	});

	$('h1').text("Local Weather App")
	$('#city').text(response.name + ",");
    $('#country').text(response.sys.country);
    $('#temp').text(Math.round(response.main.temp));
    $('#degree').html("&#176");
    $('#unit').text("F");
    $('#descr').text(response.weather[0].description);
    $('#moreInfo').text("More Info"); 
}

// function getMoreInfo(data) {
// 	console.log(showObject(data.main));
// }

function getMoreInfo(obj) {
  console.log($('#moreInfo')["0"].childElementCount);

  if($('#moreInfo')["0"].childElementCount > 0) {
  	$('#moreInfo').text("More Info");
  	return;
  }

  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += "<p class='info'>" + p + ": " + obj[p] + "</p>";
    } 
  }              
  $('#moreInfo').html(result);
}