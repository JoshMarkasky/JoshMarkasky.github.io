"use strict";
$(document).ready(function(){

    var lat = "29.4241";
    var long = "-98.4936";
    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
    var weatherObj = [
        {

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
            backPic: "url(img/wind.jpg)"
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

    /** displays weather boxes **/
    $.get(url).done(function(weather){
        console.log(weather);
        getWeather(weather);


    });


    /** determines icons and background **/
    function returnIcon(icon){
        for(var i = 0; i<=weatherObj.length; i++){
            if(icon === weatherObj[i].condition){
                // $('body, html').css('background-image', weatherObj[i].backPic);
                return "<img src=" + weatherObj[i].url + ">";
            }
        }
    }

    // function bgImg(icon){
    // for(var i = 0; i <=weatherObj.length; i++) {
    //     if (icon === weatherObj[i].condition) {
    //         $("body").css("background-image", weatherObj[i].backPic);
    //         }
    //     }
    // }


    /** determines wind bearing **/
    function returnWindBearing(windBearing) {
        for (var i = 0; i <= 6; i++) {
            if (windBearing >= 348.75 || windBearing <= 11.24) {
                return "N"
            }else if(windBearing >= 11.25 && windBearing <= 33.74){
                return "NNE"
            }else if(windBearing >= 33.75 && windBearing <= 56.24){
                return "NE"
            }else if(windBearing >= 56.25 &&  windBearing <= 78.74){
                return "ENE"
            }else if(windBearing >= 78.75 &&  windBearing <= 101.24){
                return "E"
            }else if(windBearing >= 101.25 &&  windBearing <= 123.74){
                return "ESE"
            }else if(windBearing >= 123.75 &&  windBearing <= 146.24){
                return "SE"
            }else if(windBearing >= 146.25 &&  windBearing <= 168.74){
                return "SSE"
            }else if(windBearing >= 168.75 &&  windBearing <= 191.24){
                return "S"
            }else if(windBearing >= 191.25 &&  windBearing <= 213.74){
                return "SSW"
            }else if(windBearing >= 213.75 &&  windBearing <= 236.24){
                return "SW"
            }else if(windBearing >= 236.25 &&  windBearing <= 258.74){
                return "WSW"
            }else if(windBearing >= 258.75 &&  windBearing <= 281.24){
                return "W"
            }else if(windBearing >= 281.25 &&  windBearing <= 303.74){
                return "WNW"
            }else if(windBearing >= 303.75 &&  windBearing <= 326.24){
                return "NW"
            }else if(windBearing >= 326.25 &&  windBearing <= 348.74){
                return "NNW"
            }
        }
    }
    /** determines what weather to display **/
    function getWeather(weather) {
        var html ="";
        /** current day **/
        html += "<tr><td>Currently</td>";
        html += '<td id="icon">' + returnIcon(weather.currently.icon) + weather.currently.summary + "</td>";
        html += '<td class="title">' + Math.round(weather.currently.apparentTemperature) + "&#8457" + "</td>";
        html += '<td class="title">' + Math.round(weather.currently.humidity * 100) + "%" + "</td>";
        html += '<td class="title">' + returnWindBearing(weather.currently.windBearing) + " " + Math.round(weather.currently.windSpeed) + " mph" + "</td>";
        html += '<td class="title">' + Math.round(weather.currently.precipProbability * 100) + "%" + "</td></tr>";
        /** future days **/
        for(var i = 0; i <= 2; i++) {
            html += "<tr><td>SOMEDAY</td>";
            html += '<td id="icon">' + returnIcon(weather.daily.data[i].icon) + weather.daily.data[i].summary + "</td>";
            html += '<td class="title">' + Math.round(weather.daily.data[i].apparentTemperatureHigh) + "&#8457" + "/" + Math.round(weather.daily.data[i].apparentTemperatureLow) + "&#8457" + "</td>";
            html += '<td class="title">' + Math.round(weather.daily.data[i].humidity * 100) + "%" + "</td>";
            html += '<td class="title">' + returnWindBearing(weather.daily.data[i].windBearing) + " " + Math.round(weather.daily.data[i].windSpeed) + " mph" + "</td>";
            html += '<td class="title">' + Math.round(weather.daily.data[i].precipProbability * 100) + "%" + "</td></tr>";
        }

        $("#weather-layout").html(html);
        // bgImg(weather.currently.icon);
    }

    /** MAP STUFF **/
    mapboxgl.accessToken = mapboxToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        zoom: 9,
        center: [-98.4936, 29.4241]
    });
    /** mapbox search bar **/
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    /** get weather by dragging pin **/
    var search = "The Alamo";
    geocode(search, mapboxToken).then(function(data) {
        function onDragEnd(){
            lat = marker.getLngLat().lat;
            long = marker.getLngLat().lng;
            map.setCenter([long, lat]);
            /**converts long/lat into name for title **/
            reverseGeocode({lng: long, lat: lat}, mapboxToken).then(function(loc) {
                $('.city').html(loc);
                console.log(loc);
            });
            url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
            $.get(url).done(function(weather){
                console.log(weather);
                getWeather(weather);
            });
        }
        /** map marker **/
        var marker = new mapboxgl.Marker();
        marker.setLngLat(data);
        marker.addTo(map);
        marker.setDraggable(true);
        marker.on("dragend", onDragEnd);
        console.log(lat);


        /** weather information when hitting enter **/
        $("input").on("keydown", function(e){
            var key = e.which || e.keyCode;
            if(key === 13) {
                var search = $("input").val();
                geocode(search, mapboxToken).then(function(data) {
                    map.setCenter(data);
                    long = data[0].toString();
                    lat = data[1].toString();
                    marker.setLngLat([long, lat]);
                    /**converts long/lat into name for title **/
                    reverseGeocode({lng: long, lat: lat}, mapboxToken).then(function(loc) {
                        $('.city').html(loc);
                    });
                    url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
                    $.get(url).done(function (weather) {
                        getWeather(weather);
                    });
                })
            }
        });

        /** weather information if clicking search icon **/
        $(".geocoder-icon").on("click", function(e){
            // e.preventDefault();
            var search = $("input").val();
            geocode(search, mapboxToken).then(function(data) {
                map.setCenter(data);
                long = data[0].toString();
                lat = data[1].toString();
                marker.setLngLat([long, lat]);
                /**converts long/lat into name for title **/
                reverseGeocode({lng: long, lat: lat}, mapboxToken).then(function(loc) {
                    $('.city').html(loc);
                });
                url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
                $.get(url).done(function(weather) {
                    getWeather(weather);
                });
            })
        });

        /** attempting to grab weather based on selected suggestions **/
        // $(".active").on("click", function(e){
        //     // e.preventDefault();
        //     var search = $("input").val();
        //     $('.city').html(toTitleCase(search));
        //     geocode(search, mapboxToken).then(function(data) {
        //         map.setCenter(data);
        //         long = data[0].toString();
        //         lat = data[1].toString();
        //         url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
        //         $.get(url).done(function(weather) {
        //             getWeather(weather);
        //         });
        //     })
        // });
    });




















});