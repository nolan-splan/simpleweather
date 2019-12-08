var map;
var acceleration = 0.00098;
var nDrops = 4000;
var drops = [];

function initMap() {
    navigator.geolocation.getCurrentPosition((res) => {
        var myLatLng = setLatLng(res);
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 8
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        });
        map.addListener('click', (e) => {
            setMapPosition(e, marker);
        })

        getWeatherData(myLatLng);
    })
    function setMapPosition(e, marker) {
        var newLatlng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        marker.setPosition(newLatlng);
        map['center'] = marker.position;
        getWeatherData(newLatlng);
    }

    function setLatLng(data) {
        return {
            lat: data.coords.latitude,
            lng: data.coords.longitude
        }
    }

    function getWeatherData(coords) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords["lat"]}&lon=${coords["lng"]}&units=imperial&appid=c48566402cc12bee720fb0f4c5585055`;
        fetch(url).then((res) => {
            return res.json();
        }).then((json) => {
            writeWeatherJson(json);
            renderResponse(json);
        });
    }

    function writeWeatherJson(json) {
      // lets do some filtering before writing this file...
      // these are the keys we actually care about, everything else? meh
      const whitelist = ['coord', 'main', 'name', 'sys', 'weather', 'wind']
      const { coord, main, name, sys, weather, wind } = json
      const filteredJson = {
        name,
        country: sys.country,
        description: weather[0].description,
        temp: main.temp,
        min_temp: main.temp_min,
        max_temp: main.temp_max,
        pressure: main.pressure,
        humidity: main.humidity,
        sunrise: sys.sunrise,
        sunset: sys.sunset,
        wind_speed: wind.speed,
        wind_degree: wind.deg,
        lat: coord.lat,
        lon: coord.lon,
      }

      $.ajax({
        url: '/write_weather',
        data: filteredJson,
        dataType: 'json',
        method: 'POST',
        success: () => console.log('sent the json'),
        fail: (e) => console.log(e),
      })
    }

    function renderResponse(json) {
        var name = json.name;
        var nameDiv = $(`<div class=city-name>${name}</div>`);
        $('.title').text(`Is it raining in ${name}?`);
        json.weather[0].main == "Rain" ? $('.answer').text("Yes") : $('.answer').text("No");
    }
}

// p5 sketch
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '-1');
  for (i = 0; i < nDrops; i++) {
    drops.push(new Drop());
  }
}

function draw() {
  clear();
  background(230, 230, 250);
  drops.forEach(function(d) {
    d.draw();
    d.fall();
  });
}

function Drop() {
  this.initX = function() {
    this.x = random() * width;
  };
  this.initY = function() {
    this.y = -random() * height;
  };

  this.initX();
  this.y = random() * height;

  this.length = random(1, 20);
  this.speed = random();

  this.draw = function() {
    stroke(25, 105, 234);
    line(this.x, this.y, this.x, this.y + this.length)
  };

  this.fall = function() {
    if (this.y < height) {
      this.speed += acceleration * this.length;
      this.y += this.speed;
      // make it appear that smaller drops are farther away
    } else {
      this.speed = random();
      this.initY();
      this.initX();
    }
  };
}