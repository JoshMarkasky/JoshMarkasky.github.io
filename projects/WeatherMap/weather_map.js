"use strict";
$(document).ready(function(){

    var lat = "29.4241";
    var long = "-98.4936";
    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;


    $.get(url).done(function(weather){
        console.log(weather);
            getWeather(weather);
        });

function returnIcon(icon){
    for(var i = 0; i<=weatherObj.length; i++){
            if(icon === weatherObj[i].condition){
                $('body, html').css('background-image', weatherObj[i].backPic);
                return "<img src=" + weatherObj[i].url + ">";
            }
        }
    }

function getWeather(weather) {
    var html ="";
    for(var i = 0; i <= 2; i++) {
        html += "<div class='row'>";
        html += "<div class='col-md-4 box'>";
        html += '<span class="title">' + 'Temperature High:' + '</span>' + '   ' + weather.daily.data[i].apparentTemperatureHigh + "<br>";
        html += '<span class="title">' + 'Temperature Low:' + '</span>' + ' ' + weather.daily.data[i].apparentTemperatureLow + "<br>" + '<span id="icon" class="mx-auto">' + returnIcon(weather.daily.data[i].icon) + '</span>' + "<br>";
        html += "<span id='summery'>" + weather.daily.data[i].summary + "</span>" + "<br>";
        html += '<span class="title">' + 'Humidity:' + '</span>' + ' ' + weather.daily.data[i].humidity + "<br>";
        html += '<span class="title">' + 'Wind Speed:' + '</span>' + '   ' + weather.daily.data[i].windSpeed + "<br>";
        html += '<span class="title">' + 'Pressure:  ' + '</span>' + weather.daily.data[i].pressure;
        html += "</div>";
        html += "</div";
    }
    $("#weather-layout").html(html)

}

var weatherObj = [ {
        condition: "clear-day",
        url: "icon/day.svg",
        backPic: "url(img/download.jpeg)"
                },
    {
        condition: "clear-night",
            url: "icon/night.svg",
        backPic: "url(img/clearnight.jpg)"
                },
    {
        condition: "rain",
            url: "icon/rainy-6.svg",
        backPic: "url(img/rain.jpeg)"
                },
    {
        condition: "snow",
            url: "icon/snowy-6.svg",
        backPic: "url(img/snow.webp)"
                },
    {
        condition: "sleet",
            url: "icon/sleet.svg",
        backPic: "url(img/sleet.jpeg)"
                },
    {
        condition: "wind",
            url: "icon/wind.png",
        backPic: "url(img/wind.jpeg)"
                },
    {
        condition: "fog",
            url: "icon/fog.png",
        backPic: "url(img/fog.jpeg)"
                },
    {
        condition: "cloudy",
            url: "icon/cloudy.svg",
        backPic: "url(img/clouds.jpg)"
                },
    {
        condition: "partly-cloudy-day",
            url: "icon/cloudy-day-2.svg",
        backPic: "url(img/clouds.jpg)"
                },
    {
        condition:"partly-cloudy-night",
            url: "icon/cloudy-night-3.svg",
        backPic: "url(img/partnight.jpeg)"
                }

];


    /** MAP STUFF **/

    mapboxgl.accessToken = mapboxToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        zoom: 9,
        center: [-98.4936, 29.4241]
    });

    var search = "The Alamo";

    // words to
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    $("#search-btn").on("click", function(e){
        e.preventDefault();
        var search = $("#search-man").val();
        $('.city').html(toTitleCase(search));
        geocode(search, mapboxToken).then(function(data) {
            map.setCenter(data);
            long = data[0].toString();
            lat = data[1].toString();
            url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
            $.get(url).done(function(weather) {
                getWeather(weather);
            });
            $("#search-man").val('');
       })
    });

    geocode(search, mapboxToken).then(function(data) {

    function onDragEnd(){
        lat = marker.getLngLat().lat;
        long = marker.getLngLat().lng;
        url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
        $.get(url).done(function(weather){
            console.log(weather);
            getWeather(weather);
        });
    }

        var marker = new mapboxgl.Marker();
        marker.setLngLat(data);
        marker.addTo(map);
        marker.setDraggable(true);
        marker.on("dragend", onDragEnd);

    });




















});